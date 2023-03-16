import { Exam } from "@/store/api/endpoints";

export interface ExamState {
  data: Exam[] | null;
  isError: boolean;
}

export const initialState: ExamState = {
  data: [],
  isError: false,
};
