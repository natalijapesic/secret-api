import axios from "axios";
import { Wallet, SecretNetworkClient, fromUtf8 } from "secretjs";
import fs from "fs";
import SHA256 from "crypto-js/sha256";
import MerkleTree from "merkletreejs";

// Returns a client with which we can interact with secret network
const initializeClient = async (endpoint: string, chainId: string) => {
  const wallet = new Wallet(); // Use default constructor of wallet to generate random mnemonic.
  const accAddress = wallet.address;
  const client = new SecretNetworkClient({
    // Create a client to interact with the network
    url: endpoint,
    chainId: chainId,
    wallet: wallet,
    walletAddress: accAddress,
  });

  console.log(`Initialized client with wallet address: ${accAddress}`);

  await fillUpFromFaucet(client, 3);

  return client;
};

// Stores and instantiaties a new contract in our network
const initializeContract = async (
  client: SecretNetworkClient,
  contractPath: string
) => {
  const wasmCode = fs.readFileSync(contractPath);
  console.log("Uploading contract");

  const uploadReceipt = await client.tx.compute.storeCode(
    {
      wasm_byte_code: wasmCode,
      sender: client.address,
      source: "",
      builder: "",
    },
    {
      gasLimit: 5000000,
    }
  );

  if (uploadReceipt.code !== 0) {
    console.log(
      `Failed to get code id: ${JSON.stringify(uploadReceipt.rawLog)}`
    );
    throw new Error(`Failed to upload contract`);
  }

  const codeIdKv = uploadReceipt.jsonLog![0].events[0].attributes.find(
    (a: any) => {
      return a.key === "code_id";
    }
  );

  const codeId = Number(codeIdKv!.value);
  console.log("Contract codeId: ", codeId);

  const contractCodeHash = (
    await client.query.compute.codeHashByCodeId({ code_id: String(codeId) })
  ).code_hash;

  if (contractCodeHash === undefined) {
    throw new Error(`Failed to get code hash`);
  }

  console.log(`Contract hash: ${contractCodeHash}`);

  const contract = await client.tx.compute.instantiateContract(
    {
      sender: client.address,
      code_id: codeId,
      init_msg: { name: "test" }, // Initialize our counter to start from 4. This message will trigger our Init function
      code_hash: contractCodeHash,
      label: "My contract" + Math.ceil(Math.random() * 10000), // The label should be unique for every contract, add random string in order to maintain uniqueness
    },
    {
      gasLimit: 1000000,
    }
  );

  if (contract.code !== 0) {
    throw new Error(
      `Failed to instantiate the contract with the following error ${contract.rawLog}`
    );
  }

  const contractAddress = contract.arrayLog!.find(
    (log) => log.type === "message" && log.key === "contract_address"
  )!.value;

  console.log(`Contract address: ${contractAddress}`);

  const contractInfo: [string, string] = [contractCodeHash, contractAddress];
  return contractInfo;
};

const getFromFaucet = async (address: string) => {
  await axios.get(`http://localhost:5000/faucet?address=${address}`);
};

async function getScrtBalance(userCli: SecretNetworkClient): Promise<string> {
  let balanceResponse = await userCli.query.bank.balance({
    address: userCli.address,
    denom: "uscrt",
  });

  if (balanceResponse?.balance?.amount === undefined) {
    throw new Error(`Failed to get balance for address: ${userCli.address}`);
  }

  return balanceResponse.balance.amount;
}
async function fillUpFromFaucet(
  client: SecretNetworkClient,
  targetBalance: Number
) {
  let balance = await getScrtBalance(client);
  while (Number(balance) < targetBalance) {
    try {
      await getFromFaucet(client.address);
    } catch (e) {
      console.error(`failed to get tokens from faucet: ${e}`);
    }
    balance = await getScrtBalance(client);
  }
  console.error(`got tokens from faucet: ${balance}`);
}

// Initialization procedure
async function initializeAndUploadContract() {
  let endpoint = "http://localhost:1317";
  let chainId = "secretdev-1";

  const client = await initializeClient(endpoint, chainId);

  const [contractHash, contractAddress] = await initializeContract(
    client,
    "contract.wasm"
  );

  var clientInfo: [SecretNetworkClient, string, string] = [
    client,
    contractHash,
    contractAddress,
  ];
  return clientInfo;
}

const generateRoot = (array: string[]) => {
  const leaves = array.map((x) => SHA256(x));
  const tree = new MerkleTree(leaves, SHA256);
  const root = tree.getRoot();
  return root;
};

async function saveExamTx(
  client: SecretNetworkClient,
  contractHash: string,
  contractAddess: string
) {
  const root = generateRoot(["a", "b", "c"]);

  console.log(root.toJSON().data);

  const tx = await client.tx.compute.executeContract(
    {
      sender: client.address,
      contract_address: contractAddess,
      code_hash: contractHash,
      msg: {
        save_exam: {
          course_name: "Math",
          start_time: "1678627122",
          orgs: {
            root: root.toJSON().data,
            leaves_count: "3",
          },
          ipfs: { path: "path", secret: "secret", iv: "iv" },
        },
      },
      sent_funds: [],
    },
    {
      gasLimit: 200000,
    }
  );

  console.log(tx.rawLog);

  let parsedTransactionData = fromUtf8(tx.data[0]);
  console.log("save exam", parsedTransactionData);
  console.log(`Save exam TX used ${tx.gasUsed} gas`);
  return parsedTransactionData;
}

type ExamResponse = { path: string; secret: string; iv: string };

async function queryExam(
  client: SecretNetworkClient,
  contractHash: string,
  contractAddress: string
): Promise<ExamResponse> {
  const examResponse: ExamResponse = await client.query.compute.queryContract({
    contract_address: contractAddress,
    code_hash: contractHash,
    query: { get_exam: { exam_id: 2 } },
  });

  return examResponse;
}

async function test_save_exam(
  client: SecretNetworkClient,
  contractHash: string,
  contractAddress: string
) {
  await saveExamTx(client, contractHash, contractAddress);

  const response = await queryExam(client, contractHash, contractAddress);

  console.log("Exam response", response);
}

async function runTestFunction(
  tester: (
    client: SecretNetworkClient,
    contractHash: string,
    contractAddress: string
  ) => void,
  client: SecretNetworkClient,
  contractHash: string,
  contractAddress: string
) {
  console.log(`Testing ${tester.name}`);
  await tester(client, contractHash, contractAddress);
  console.log(`[SUCCESS] ${tester.name}`);
}

(async () => {
  const [client, contractHash, contractAddress] =
    await initializeAndUploadContract();

  await runTestFunction(test_save_exam, client, contractHash, contractAddress);
})();
