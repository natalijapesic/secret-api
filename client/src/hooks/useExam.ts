import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import {
  CreateExamRequest,
  Exam,
  LocationInfo,
  Question,
  SecretApi as Api,
  UploadQuestionsRequest,
} from "@/store/api/endpoints";
import { appendEntity, loadData } from "@/store/exam";
import { loadLocations } from "@/store/user";
import { toast } from "react-toastify";
import { generateInfo, generateTree } from "@/services/merkleTree";
import { Ipfs, SaveExam } from "@/services/types";
import secretjsService from "@/services/secretjs.service";
import { useContext } from "react";
import { ClientContext } from "@/types/clientContext";

export const useExam = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { client } = useContext(ClientContext);

  const loadExams = async () => {
    const { data, isError } = await dispatch(
      Api.endpoints["findAllExam"].initiate()
    );

    dispatch(
      loadData({
        data: data ? data : [],
        isError,
      })
    );
  };

  const createExam = async (reqeust: CreateExamRequest) => {
    const response = await dispatch(
      Api.endpoints["createExam"].initiate({ createExamRequest: reqeust })
    ).unwrap();

    if (response) {
      dispatch(appendEntity(response));
      toast("Created exam", { type: "success" });
    }
  };

  const loadExamLocations = async (userId: string) => {
    const { data } = await dispatch(
      Api.endpoints["loadLocationsUser"].initiate({ id: userId })
    );
    const response = data as LocationInfo[];

    dispatch(loadLocations(response));
  };

  const uploadExam = async (questions: Question[], exam: Exam) => {
    if (!client)
      throw new Error("User need to have wallet for executing transactions");

    console.log(client.address);

    const response = await dispatch(
      Api.endpoints["uploadExam"].initiate({
        uploadQuestionsRequest: {
          questions,
          walletAddres: client.address,
          examId: exam.id,
        },
      })
    ).unwrap();

    if (response) {
      console.log(response);
      const merkleTreeInfo = generateInfo(
        generateTree(response.organizationAddresses),
        2
      );

      const request: SaveExam = {
        course_name: "delete me",
        ipfs: response.ipfsInfo as Ipfs,
        orgs: merkleTreeInfo,
        start_time: exam.time,
      };

      console.log(request);

      await secretjsService.saveExamTx(request, client);
    }
  };

  return { loadExams, loadExamLocations, createExam, uploadExam };
};
