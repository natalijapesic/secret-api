import { Exam } from "@/store/api/endpoints";
import { initialState } from "@/store/exam/initalState";
import { LoadDataAction } from "@/store/exam/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const examSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    loadData: (state, action: PayloadAction<LoadDataAction>) => {
      state.data = action.payload.data;
      state.isError = action.payload.isError;
    },
    appendEntity: (state, action: PayloadAction<Exam>) => {
      if (action.payload && state.data) state.data.push(action.payload);
    },
    updateEntity: (state, action: PayloadAction<Exam>) => {
      if (action.payload && state.data) {
        const index = state.data.findIndex(
          (entity) => entity.id === action.payload?.id
        );

        state.data[index] = action.payload;
      }
    },
  },
});

export const { loadData, appendEntity, updateEntity } = examSlice.actions;

export * from "./selectors";

export default examSlice.reducer;
