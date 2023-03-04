import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import qs from 'qs';

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000',
        // paramsSerializer(params) {
        //     return qs.stringify(params);
        // },
    }),
    endpoints: () => ({}),
});