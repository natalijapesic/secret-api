import { AppDispatch } from "@/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SecretApi as Api } from "@/store/api/endpoints";
import { loadData } from "@/store/exam";

const loadExamThunk = createAsyncThunk<void, { dispatch: AppDispatch }>(
  "exam/loadData",
  async ({}, { dispatch }) => {
    const { data, isError } = await dispatch(
      Api.endpoints["findAllExam"].initiate()
    );

    dispatch(
      loadData({
        data: data ? data : null,
        isError,
      })
    );
  }
);

export default loadExamThunk;
