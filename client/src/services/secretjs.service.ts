import { ExamResponse, SaveExam } from "@/services/types";
import { fromUtf8, MsgExecuteContractResponse, SecretNetworkClient, TxResponse, Wallet } from "secretjs";

const chainId = "secretdev-1";
const url = "http://localhost:1317";
const contractHash = "";
const contractAddress = "";

class SecretJsService {
  async initializeClient() {
    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    while (
      !window.keplr ||
      !window.getEnigmaUtils ||
      !window.getOfflineSignerOnlyAmino
    ) {
      await sleep(50);
    }

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

    const parsedTransactionData = fromUtf8(MsgExecuteContractResponse.decode(tx.data[0]).data);
    console.log("Exam tx response", parsedTransactionData);

    return JSON.parse(fromUtf8(MsgExecuteContractResponse.decode(tx.data[0]).data)) as ExamResponse;
  }
}

export default new SecretJsService();
