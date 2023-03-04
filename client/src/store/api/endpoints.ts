import { api } from "../api";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getHelloApp: build.query<GetHelloAppApiResponse, GetHelloAppApiArg>({
      query: (queryArg) => ({ url: `/${queryArg.message}` }),
    }),
    signInAuth: build.mutation<SignInAuthApiResponse, SignInAuthApiArg>({
      query: (queryArg) => ({
        url: `/auth/signIn`,
        method: "POST",
        body: queryArg.signUser,
      }),
    }),
    getUserInfoAuth: build.query<
      GetUserInfoAuthApiResponse,
      GetUserInfoAuthApiArg
    >({
      query: () => ({ url: `/auth/info` }),
    }),
    signUpAuth: build.mutation<SignUpAuthApiResponse, SignUpAuthApiArg>({
      query: (queryArg) => ({
        url: `/auth/signUp`,
        method: "POST",
        body: queryArg.registerUser,
      }),
    }),
    getUser: build.query<GetUserApiResponse, GetUserApiArg>({
      query: (queryArg) => ({ url: `/user/${queryArg.id}` }),
    }),
    deleteUser: build.mutation<DeleteUserApiResponse, DeleteUserApiArg>({
      query: (queryArg) => ({ url: `/user/${queryArg.id}`, method: "DELETE" }),
    }),
    getAllUser: build.query<GetAllUserApiResponse, GetAllUserApiArg>({
      query: () => ({ url: `/user` }),
    }),
    createExam: build.mutation<CreateExamApiResponse, CreateExamApiArg>({
      query: (queryArg) => ({
        url: `/exam`,
        method: "POST",
        body: queryArg.createExam,
      }),
    }),
    findExam: build.query<FindExamApiResponse, FindExamApiArg>({
      query: () => ({ url: `/exam` }),
    }),
    findOneExam: build.query<FindOneExamApiResponse, FindOneExamApiArg>({
      query: (queryArg) => ({ url: `/exam/${queryArg.id}` }),
    }),
    updateExam: build.mutation<UpdateExamApiResponse, UpdateExamApiArg>({
      query: (queryArg) => ({
        url: `/exam/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updateExam,
      }),
    }),
    removeExam: build.mutation<RemoveExamApiResponse, RemoveExamApiArg>({
      query: (queryArg) => ({ url: `/exam/${queryArg.id}`, method: "DELETE" }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as PimsApi };
export type GetHelloAppApiResponse = /** status 200  */ string;
export type GetHelloAppApiArg = {
  message: string;
};
export type SignInAuthApiResponse = /** status 201  */ AuthResponse;
export type SignInAuthApiArg = {
  signUser: SignUser;
};
export type GetUserInfoAuthApiResponse = /** status 200  */ object;
export type GetUserInfoAuthApiArg = void;
export type SignUpAuthApiResponse = /** status 201  */ AuthResponse;
export type SignUpAuthApiArg = {
  registerUser: RegisterUser;
};
export type GetUserApiResponse = /** status 200  */ UserResponse;
export type GetUserApiArg = {
  id: string;
};
export type DeleteUserApiResponse = /** status 200  */ string;
export type DeleteUserApiArg = {
  id: string;
};
export type GetAllUserApiResponse = /** status 200  */ UserResponse[];
export type GetAllUserApiArg = void;
export type CreateExamApiResponse = unknown;
export type CreateExamApiArg = {
  createExam: CreateExam;
};
export type FindExamApiResponse = /** status 200  */ object[];
export type FindExamApiArg = void;
export type FindOneExamApiResponse = /** status 200  */ object;
export type FindOneExamApiArg = {
  id: string;
};
export type UpdateExamApiResponse = unknown;
export type UpdateExamApiArg = {
  id: string;
  updateExam: UpdateExam;
};
export type RemoveExamApiResponse = unknown;
export type RemoveExamApiArg = {
  id: string;
};
export type AuthResponse = {};
export type SignUser = {
  username: string;
  password: string;
};
export type RegisterUser = {
  role: "profesor" | "student" | "organization";
  name: string;
  username: string;
  jmbg: string;
  password: string;
  email: string;
  wallet: string;
};
export type UserResponse = {
  role: "profesor" | "student" | "organization";
  id: string;
  email: string;
  wallet?: string;
  username: string;
};
export type LocationInfo = {};
export type CreateExam = {
  name: string;
  time: number;
  contractId?: number;
  course: string;
  locations: LocationInfo[];
  organizationIds: string[];
};
export type UpdateExam = {};
export const {
  useGetHelloAppQuery,
  useSignInAuthMutation,
  useGetUserInfoAuthQuery,
  useSignUpAuthMutation,
  useGetUserQuery,
  useDeleteUserMutation,
  useGetAllUserQuery,
  useCreateExamMutation,
  useFindExamQuery,
  useFindOneExamQuery,
  useUpdateExamMutation,
  useRemoveExamMutation,
} = injectedRtkApi;
