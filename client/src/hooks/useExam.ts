import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { SecretApi as Api } from "@/store/api/endpoints";
import { loadData } from "@/store/exam";

export const useExamPage = () => {
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

  const loadLocation = async (userId: string, examId: string) => {
    const { data, isError } = await dispatch(
      Api.endpoints["findUsersLocation"].initiate({ userId, examId })
    );

    // dispatch(
    //   loadData({
    //     data: data ? data : null,
    //     isError,
    //   })
    // );
  };

  return { loadExams, loadLocation };
};
