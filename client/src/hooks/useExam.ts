import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import {
  CreateExamRequest,
  Exam,
  LocationInfo,
  Question,
  SecretApi as Api,
} from "@/store/api/endpoints";
import { appendEntity, loadData, updateEntity } from "@/store/exam";
import { loadLocations } from "@/store/user";
import { toast } from "react-toastify";
import {
  generateAuth,
  generateInfo,
  generateTree,
} from "@/services/merkleTree";
import { ExamResponse, Ipfs, SaveExam, StartExam } from "@/services/types";
import secretjsService from "@/services/secretjs.service";
import { useContext } from "react";
import { ClientContext } from "@/types/clientContext";
import { useRouter } from "next/router";

export const useExam = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { client } = useContext(ClientContext);
  const router = useRouter();

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
      console.log("HERE", response);
      dispatch(appendEntity(response));
      toast("Created exam", { type: "success" });
      router.push(`/`);
    }
  };

  const loadExamLocations = async (userId: string) => {
    const { data } = await dispatch(
      Api.endpoints["loadLocationsUser"].initiate({ id: userId })
    );
    const response = data as LocationInfo[];

    dispatch(loadLocations(response));
  };

  const updateExam = async (id: string, contractId: number) => {
    const response = await dispatch(
      Api.endpoints["updateExam"].initiate({
        id,
        updateExamRequest: { contractId },
      })
    ).unwrap();

    console.log(response);

    if (response) {
      dispatch(updateEntity(response));
    }
  };

  const uploadExam = async (questions: Question[], exam: Exam) => {
    if (!client)
      throw new Error("User need to have wallet for executing transactions");

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
      const merkleTreeInfo = generateInfo(
        generateTree(response.organizationAddresses),
        response.organizationAddresses.length
      );

      const request: SaveExam = {
        course_name: "delete me",
        ipfs: response.ipfsInfo as Ipfs,
        orgs: merkleTreeInfo,
        start_time: exam.time,
      };

      const { exam_id: contractId }: ExamResponse =
        await secretjsService.saveExamTx(request, client);

      updateExam(exam.id, contractId);

      router.push(`/`);
    }
  };

  const organizationAddresses = async (examId: string) => {
    const { data } = await dispatch(
      Api.endpoints["organizationByExam"].initiate({ id: examId })
    );

    return data;
  };

  const startExam = async (exam: Exam) => {
    if (!client)
      throw new Error("User need to have wallet for executing transactions");

    const addresses = await organizationAddresses(exam.id);

    if (!addresses) {
      toast("Exam is not properly created", { type: "error" });
      return;
    }

    const addressIndex = addresses.findIndex(
      (address) => address === client.address
    );

    const auth = generateAuth(
      generateTree(addresses),
      client.address,
      addressIndex.toString()
    );

    if (!exam.contractId) {
      toast("Exam is not on the contract", { type: "error" });
      return;
    }

    const { ipfs }: ExamResponse = await secretjsService.startExamTx(
      { auth, exam_id: exam.contractId },
      client
    );

    const response = await dispatch(
      Api.endpoints["downloadExam"].initiate({
        downloadRequest: { ipfsInfo: ipfs },
      })
    ).unwrap();

    return response;
  };

  const refetchExams = async () => {
    await loadExams();
  };

  return {
    loadExams,
    loadExamLocations,
    createExam,
    uploadExam,
    refetchExams,
    startExam,
    organizationAddresses,
  };
};
