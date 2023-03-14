import { Header } from "@/components/header";
import { Inter } from "@next/font/google";
import {
  UploadQuestionsRequest,
  UploadQuestionsResponse,
} from "@/store/api/endpoints";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { SecretNetworkClient } from "secretjs";
import axios from "@/types/axiosSetUp";
import secretjsService from "@/services/secretjs.service";
import { Ipfs, SaveExam } from "@/services/types";
import { generateInfo, generateTree } from "@/services/merkleTree";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  // const client = useRef<SecretNetworkClient | null>(null);

  const uploadExam = async (
    request: UploadQuestionsRequest
  ): Promise<UploadQuestionsResponse> => {
    return await axios
      .post<UploadQuestionsResponse>("/exam/upload", request)
      .then((value) => value.data)
      .catch((error) => error.response.data);
  };

  const handleClick = async () => {
    const client = await secretjsService.initializeClient();
    const response = await uploadExam({
      questions: [
        {
          text: "string",
          options: ["string"],
          answer: "string",
        },
        {
          text: "string",
          options: ["string"],
          answer: "string",
        },
      ],
      walletAddres: "secret1ypjgplhk9x7attdf90jnzwp0h7p7zlhp08w0w2",
    });
    console.log(response);
    const merkleTreeInfo = generateInfo(
      generateTree(response.organizationAddresses),
      2
    );
    const request: SaveExam = {
      course_name: "ldkjs",
      ipfs: response.ipfsInfo as Ipfs,
      orgs: merkleTreeInfo,
      start_time: "1678627122",
    };

    await secretjsService.saveExamTx(request, client);
  };

  return (
    <>
      <Header></Header>
      <button onClick={handleClick}>Upload</button>
      <main></main>
    </>
  );
}
