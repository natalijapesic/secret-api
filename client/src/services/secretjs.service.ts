import { ExamResponse, SaveExam, StartExam } from "@/services/types";
import {
  fromUtf8,
  MsgExecuteContractResponse,
  SecretNetworkClient,
  TxResponse,
} from "secretjs";

const chainId = "secretdev-1";
const url = "http://localhost:1317";
const contractHash =
  "38885b4e2f30d0b9e2e1db348232ad3ef1047e21f1b14f08c3a8cbba9a0dafec";
const contractAddress = "secret1nh6eel87mzg7prdlctm458yxexk7ce3jap82fa";

class SecretJsService {
  async initializeClient() {
    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    while (
      typeof window === "undefined" ||
      !window?.keplr ||
      !window.getEnigmaUtils ||
      !window.getOfflineSignerOnlyAmino
    ) {
      await sleep(50);
    }

    await window.keplr.experimentalSuggestChain({
      chainId: "secretdev-1",
      chainName: "LocalSecret",
      rpc: "http://localhost:26657",
      rest: "http://localhost:1317",
      bip44: {
        coinType: 529,
      },
      bech32Config: {
        bech32PrefixAccAddr: "secret",
        bech32PrefixAccPub: "secretpub",
        bech32PrefixValAddr: "secretvaloper",
        bech32PrefixValPub: "secretvaloperpub",
        bech32PrefixConsAddr: "secretvalcons",
        bech32PrefixConsPub: "secretvalconspub",
      },
      currencies: [
        {
          coinDenom: "SCRT",
          coinMinimalDenom: "uscrt",
          coinDecimals: 6,
          coinGeckoId: "secret",
        },
      ],
      feeCurrencies: [
        {
          coinDenom: "SCRT",
          coinMinimalDenom: "uscrt",
          coinDecimals: 6,
          coinGeckoId: "secret",
        },
      ],
      stakeCurrency: {
        coinDenom: "SCRT",
        coinMinimalDenom: "uscrt",
        coinDecimals: 6,
        coinGeckoId: "secret",
      },
      coinType: 529,
      features: ["secretwasm", "stargate", "ibc-transfer", "ibc-go"],
    });
    await window.keplr.enable(chainId);

    const keplrOfflineSigner = window.keplr.getOfflineSignerOnlyAmino(chainId);
    const [{ address: walletAddress }] = await keplrOfflineSigner.getAccounts();

    const client = new SecretNetworkClient({
      url,
      chainId,
      wallet: keplrOfflineSigner,
      walletAddress,
      encryptionUtils: window.keplr.getEnigmaUtils(chainId),
    });

    return client;
  }

  async saveExamTx(
    request: SaveExam,
    client: SecretNetworkClient
  ): Promise<ExamResponse> {
    const tx: TxResponse = await client.tx.compute.executeContract(
      {
        sender: client.address,
        contract_address: contractAddress,
        code_hash: contractHash,
        msg: {
          save_exam: request,
        },
        sent_funds: [],
      },
      {
        gasLimit: 200000,
      }
    );

    if (tx.code !== 0) throw Error(tx.rawLog);

    const parsedTransactionData = fromUtf8(
      MsgExecuteContractResponse.decode(tx.data[0]).data
    );
    console.log("Exam tx response", parsedTransactionData);

    return JSON.parse(
      fromUtf8(MsgExecuteContractResponse.decode(tx.data[0]).data)
    ) as ExamResponse;
  }

  async startExamTx(
    request: StartExam,
    client: SecretNetworkClient
  ): Promise<ExamResponse> {
    const tx: TxResponse = await client.tx.compute.executeContract(
      {
        sender: client.address,
        contract_address: contractAddress,
        code_hash: contractHash,
        msg: {
          start_exam: request,
        },
        sent_funds: [],
      },
      {
        gasLimit: 200000,
      }
    );

    if (tx.code !== 0) throw Error(tx.rawLog);

    const parsedTransactionData = fromUtf8(
      MsgExecuteContractResponse.decode(tx.data[0]).data
    );
    console.log("Exam tx response", parsedTransactionData);

    console.log(
      JSON.parse(fromUtf8(MsgExecuteContractResponse.decode(tx.data[0]).data))
    );
    return JSON.parse(
      fromUtf8(MsgExecuteContractResponse.decode(tx.data[0]).data)
    ) as ExamResponse;
  }
}

export default new SecretJsService();
