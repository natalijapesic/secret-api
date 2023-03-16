import { RootState } from "@/store";

export const selectExamsState = (state: RootState) => state.exam;

export const selectExamsData = (state: RootState) => state.exam.data;
