import axios from "axios";
import { Wallet, SecretNetworkClient, fromUtf8 } from "secretjs";
import fs from "fs";
import SHA256 from "crypto-js/sha256";
import MerkleTree from "merkletreejs";

type IpfsResponse = { path: string; secret: string; iv: string };

const parlamentAddresses = [
  "secret1ypjgplhk9x7attdf90jnzwp0h7p7zlhp08w0w2",
  "secret1fdlw5a6jnsvrdjx64nrnd44ue2
  f45ml4vhmf73",
];
type ExamResponse = {
  exam_id: number;
  exam_time: string;
  ipfs: IpfsResponse;
};

type MerkleData = {
  root: number[];
  proof: number[][] | null;
  index: string;
};

const merkleData: MerkleData = {
  root: [],
  index: "0",
  proof: [[0]],
};

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

  parlamentAddresses.push(client.address);
  const contract = await client.tx.compute.instantiateContract(
    {
      sender: client.address,
      code_id: codeId,
      init_msg: { parlament: parlamentAddresses },
      code_hash: contractCodeHash,
      label: "My contract" + Math.ceil(Math.random() * 10000),
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
  const leaf = SHA256(array[0]);
  const proof = tree.getProof(leaf as any).map((p) => p.data);
  merkleData.proof = proof.map((single) => single.toJSON().data);
  const root = tree.getRoot();
  merkleData.root = root.toJSON().data;
};

async function saveExamTx(
  client: SecretNetworkClient,
  contractHash: string,
  contractAddess: string
): Promise<ExamResponse> {
  const org1 = new Wallet();
  const org2 = new Wallet();
  generateRoot([client.address, org1.address, org2.address]);

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
            root: merkleData.root,
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
  console.log(fromUtf8(tx.data[0]));

  const parsedTransactionData = fromUtf8(tx.data[0]);
  console.log("save exam", parsedTransactionData);
  console.log(`Save exam TX used ${tx.gasUsed} gas`);
  console.log("Exam tx response", parsedTransactionData);

  return JSON.parse(parsedTransactionData.replace("Y", "")) as ExamResponse;
}

async function startExamTx(
  client: SecretNetworkClient,
  contractHash: string,
  contractAddess: string
): Promise<ExamResponse> {
  const tx = await client.tx.compute.executeContract(
    {
      sender: client.address,
      contract_address: contractAddess,
      code_hash: contractHash,
      msg: {
        start_exam: {
          exam_id: 1,
          auth: {
            index: merkleData.index,
            proof: merkleData.proof,
          },
        },
      },
      sent_funds: [],
    },
    {
      gasLimit: 200000,
    }
  );

  console.log("raw log", tx.rawLog);

  const parsedTransactionData = fromUtf8(tx.data[0]);
  console.log("start exam", parsedTransactionData);
  console.log(`start exam TX used ${tx.gasUsed} gas`);
  console.log("Exam tx response", parsedTransactionData);

  return JSON.parse(parsedTransactionData.replace("Y", "")) as ExamResponse;
}

async function test_start_exam(
  client: SecretNetworkClient,
  contractHash: string,
  contractAddress: string
) {
  const exam_response = await startExamTx(
    client,
    contractHash,
    contractAddress
  );

  const response = await queryExam(
    client,
    contractHash,
    contractAddress,
    exam_response.exam_id
  );

  console.log("Start exam response", response);
}

async function changeTimeTx(
  client: SecretNetworkClient,
  contractHash: string,
  contractAddess: string
): Promise<ExamResponse> {
  const tx = await client.tx.compute.executeContract(
    {
      sender: client.address,
      contract_address: contractAddess,
      code_hash: contractHash,
      msg: {
        change_time: {
          exam_id: 1,
          time: "1681391404",
        },
      },
      sent_funds: [],
    },
    {
      gasLimit: 200000,
    }
  );

  console.log(tx.rawLog);

  const parsedTransactionData = fromUtf8(tx.data[0]);
  console.log("save exam", parsedTransactionData);
  console.log(`Save exam TX used ${tx.gasUsed} gas`);
  console.log("Exam tx response", parsedTransactionData);

  return JSON.parse(parsedTransactionData.replace("Y", "")) as ExamResponse;
}

async function queryExam(
  client: SecretNetworkClient,
  contractHash: string,
  contractAddress: string,
  exam_id: number
): Promise<any> {
  const examResponse = await client.query.compute.queryContract({
    contract_address: contractAddress,
    code_hash: contractHash,
    query: { get_exam: { exam_id } },
  });

  return examResponse;
}

async function test_save_exam(
  client: SecretNetworkClient,
  contractHash: string,
  contractAddress: string
) {
  const exam_response = await saveExamTx(client, contractHash, contractAddress);

  const response = await queryExam(
    client,
    contractHash,
    contractAddress,
    exam_response.exam_id
  );

  console.log("Exam response", response);
}

async function test_change_time(
  client: SecretNetworkClient,
  contractHash: string,
  contractAddress: string
) {
  const exam_response = await changeTimeTx(
    client,
    contractHash,
    contractAddress
  );

  const response = await queryExam(
    client,
    contractHash,
    contractAddress,
    exam_response.exam_id
  );

  console.log("Change time exam response", response);
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
  // await runTestFunction(
  //   test_change_time,
  //   client,
  //   contractHash,
  //   contractAddress
  // );

  await runTestFunction(test_start_exam, client, contractHash, contractAddress);
})();
