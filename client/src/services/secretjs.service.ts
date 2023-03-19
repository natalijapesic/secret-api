import { ExamResponse, SaveExam } from "@/services/types";
import {
  fromUtf8,
  MsgExecuteContractResponse,
  SecretNetworkClient,
  TxResponse,
} from "secretjs";

const chainId = "secretdev-1";
const url = "http://localhost:1317";
const contractHash =
  "394b7706d51c83f84ee275cb175cb3c8fc3c2f83e00350cc30f33953dba6b7ae";
const contractAddress = "secret1ulgw0td86nvs4wtpsc80thv6xelk76ut6us57w";

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
      // gasPriceStep: {
      //   low: 0.1,
      //   average: 0.25,
      //   high: 1,
      // },
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
    if (client) {
      console.log(client);
    }
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
}

export default new SecretJsService();
