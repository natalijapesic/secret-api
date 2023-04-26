import { RootState } from "@/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import qs from "qs";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    fetchFn: fetch,
    baseUrl: "http://192.168.0.18:4000",
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).user.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
    paramsSerializer(params) {
      return qs.stringify(params);
    },
  }),
  endpoints: () => ({}),
});
