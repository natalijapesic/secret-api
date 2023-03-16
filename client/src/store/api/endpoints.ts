import { api } from "../api";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
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
        body: queryArg.createExamRequest,
      }),
    }),
    findAllExam: build.query<FindAllExamApiResponse, FindAllExamApiArg>({
      query: () => ({ url: `/exam` }),
    }),
    findOneExam: build.query<FindOneExamApiResponse, FindOneExamApiArg>({
      query: (queryArg) => ({ url: `/exam/${queryArg.id}` }),
    }),
    updateExam: build.mutation<UpdateExamApiResponse, UpdateExamApiArg>({
      query: (queryArg) => ({
        url: `/exam/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updateExamRequest,
      }),
    }),
    removeExam: build.mutation<RemoveExamApiResponse, RemoveExamApiArg>({
      query: (queryArg) => ({ url: `/exam/${queryArg.id}`, method: "DELETE" }),
    }),
    uploadExam: build.mutation<UploadExamApiResponse, UploadExamApiArg>({
      query: (queryArg) => ({
        url: `/exam/upload`,
        method: "POST",
        body: queryArg.uploadQuestionsRequest,
      }),
    }),
    updateRelationExam: build.mutation<
      UpdateRelationExamApiResponse,
      UpdateRelationExamApiArg
    >({
      query: (queryArg) => ({
        url: `/exam/${queryArg.id}/relationships/user`,
        method: "PATCH",
        body: queryArg.updateUserRelation,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as SecretApi };
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
export type CreateExamApiResponse = /** status 201  */ Exam;
export type CreateExamApiArg = {
  createExamRequest: CreateExamRequest;
};
export type FindAllExamApiResponse = /** status 200  */ Exam[];
export type FindAllExamApiArg = void;
export type FindOneExamApiResponse = /** status 200  */ Exam;
export type FindOneExamApiArg = {
  id: string;
};
export type UpdateExamApiResponse = /** status 200  */ Exam;
export type UpdateExamApiArg = {
  id: string;
  updateExamRequest: UpdateExamRequest;
};
export type RemoveExamApiResponse = unknown;
export type RemoveExamApiArg = {
  id: string;
};
export type UploadExamApiResponse = /** status 201  */ UploadQuestionsResponse;
export type UploadExamApiArg = {
  uploadQuestionsRequest: UploadQuestionsRequest;
};
export type UpdateRelationExamApiResponse = /** status 200  */ Exam;
export type UpdateRelationExamApiArg = {
  id: string;
  updateUserRelation: UpdateUserRelation;
};
export type AuthResponse = {};
export type SignUser = {
  username: string;
  password: string;
};
export type RegisterUser = {
  role: "admin" | "parlament" | "profesor" | "student" | "organization";
  name: string;
  username: string;
  jmbg: string;
  password: string;
  email: string;
  walletAddress?: string;
};
export type UserResponse = {
  role: "admin" | "parlament" | "profesor" | "student" | "organization";
  id: string;
  email: string;
  walletAddress?: string;
  username: string;
};
export type Exam = {
  id: string;
  name: string;
  time: number;
  contractId?: string;
  course: string;
  isReady: boolean;
  users: object;
  locations: object;
};
export type LocationInfo = {
  id: string;
  street: string;
  number: string;
  city: string;
  municipality?: string;
};
export type CreateExamRequest = {
  name: string;
  time: number;
  course: string;
  locations?: LocationInfo[];
};
export type UpdateExamRequest = {
  isReady: boolean;
  contractId: string;
};
export type UploadQuestionsResponse = {
  ipfsInfo: object;
  organizationAddresses: string[];
};
export type Question = {
  text: string;
  options: string[];
  answer: string;
};
export type UploadQuestionsRequest = {
  questions: Question[];
  walletAddres: string;
};
export type UpdateUserRelation = {
  userIds: string[];
};
export const {
  useSignInAuthMutation,
  useGetUserInfoAuthQuery,
  useSignUpAuthMutation,
  useGetUserQuery,
  useDeleteUserMutation,
  useGetAllUserQuery,
  useCreateExamMutation,
  useFindAllExamQuery,
  useFindOneExamQuery,
  useUpdateExamMutation,
  useRemoveExamMutation,
  useUploadExamMutation,
  useUpdateRelationExamMutation,
} = injectedRtkApi;
