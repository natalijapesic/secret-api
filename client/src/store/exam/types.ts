import { Exam } from "@/store/api/endpoints";

export interface LoadDataAction {
  data: Exam[] | null;
  isError: boolean;
}
