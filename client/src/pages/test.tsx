import { Header } from "@/components/header";
import { Inter } from "@next/font/google";
import {
  UploadQuestionsRequest,
  UploadQuestionsResponse,
} from "@/store/api/endpoints";
import secretjsService from "@/services/secretjs.service";
import { Ipfs, SaveExam } from "@/services/types";
import { generateInfo, generateTree } from "@/services/merkleTree";
import { useContext } from "react";
import { ClientContext } from "@/types/clientContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // const { client } = useContext(ClientContext);

  // const uploadExam = async (
  //   request: UploadQuestionsRequest
  // ): Promise<UploadQuestionsResponse> => {
  //   return await axios
  //     .post<UploadQuestionsResponse>("/exam/upload", request)
  //     .then((value) => value.data)
  //     .catch((error) => error.response.data);
  // };

  // const handleClick = async () => {
  //   const response = await uploadExam({
  //     questions: [
  //       {
  //         text: "string",
  //         options: { ["E"]: "dsfsd" },
  //         answer: "string",
  //       },
  //       {
  //         text: "string",
  //         options: { ["E"]: "dsfsd" },
  //         answer: "string",
  //       },
  //     ],
  //     walletAddres: "secret1ypjgplhk9x7attdf90jnzwp0h7p7zlhp08w0w2",
  //     examId: "887e55e9-5dc6-4729-a5b1-f6d6a39f7386",
  //   });
  //   const merkleTreeInfo = generateInfo(
  //     generateTree(response.organizationAddresses),
  //     2
  //   );
  //   const request: SaveExam = {
  //     course_name: "ldkjs",
  //     ipfs: response.ipfsInfo as Ipfs,
  //     orgs: merkleTreeInfo,
  //     start_time: "1678627122",
  //   };

  //   await secretjsService.saveExamTx(request, client!);
  // };

  return <></>;
}
