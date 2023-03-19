import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { LocationInfo, SecretApi as Api } from "@/store/api/endpoints";
import { loadData } from "@/store/exam";
import { loadLocations } from "@/store/user";

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

  const loadExamLocations = async (userId: string) => {
    const { data } = await dispatch(
      Api.endpoints["loadLocationsUser"].initiate({ id: userId })
    );
    const response = data as LocationInfo[];

    dispatch(loadLocations(response));
  };

  return { loadExams, loadExamLocations };
};
