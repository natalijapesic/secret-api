import { RootState } from "@/store";

export const selectExamsState = (state: RootState) => state.exam;

export const selectExamsData = (state: RootState) => state.exam.data;

export const selectExamById = (state: RootState, id: string) =>
  state.exam.data.find((exam) => exam.id === id);
