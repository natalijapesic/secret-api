import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import {
  CreateExamRequest,
  LocationInfo,
  SecretApi as Api,
} from "@/store/api/endpoints";
import { appendEntity, loadData } from "@/store/exam";
import { loadLocations } from "@/store/user";
import { toast } from "react-toastify";

export const useExam = () => {
  const dispatch = useDispatch<AppDispatch>();

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

  return { loadExams, loadExamLocations, createExam };
};
