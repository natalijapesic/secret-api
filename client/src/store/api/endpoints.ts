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
    loadLocationsUser: build.query<
      LoadLocationsUserApiResponse,
      LoadLocationsUserApiArg
    >({
      query: (queryArg) => ({ url: `/user/${queryArg.id}/loadLocations` }),
    }),
    getAllUser: build.query<GetAllUserApiResponse, GetAllUserApiArg>({
      query: () => ({ url: `/user` }),
    }),
    deleteUser: build.mutation<DeleteUserApiResponse, DeleteUserApiArg>({
      query: (queryArg) => ({ url: `/user/${queryArg.id}`, method: "DELETE" }),
    }),
    createLocation: build.mutation<
      CreateLocationApiResponse,
      CreateLocationApiArg
    >({
      query: (queryArg) => ({
        url: `/location`,
        method: "POST",
        body: queryArg.createLocation,
      }),
    }),
    findAllLocation: build.query<
      FindAllLocationApiResponse,
      FindAllLocationApiArg
    >({
      query: () => ({ url: `/location` }),
    }),
    findOneLocation: build.query<
      FindOneLocationApiResponse,
      FindOneLocationApiArg
    >({
      query: (queryArg) => ({ url: `/location/${queryArg.id}` }),
    }),
    updateLocation: build.mutation<
      UpdateLocationApiResponse,
      UpdateLocationApiArg
    >({
      query: (queryArg) => ({
        url: `/location/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updateLocation,
      }),
    }),
    removeLocation: build.mutation<
      RemoveLocationApiResponse,
      RemoveLocationApiArg
    >({
      query: (queryArg) => ({
        url: `/location/${queryArg.id}`,
        method: "DELETE",
      }),
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
export type LoadLocationsUserApiResponse = /** status 200  */ LocationInfo[];
export type LoadLocationsUserApiArg = {
  id: string;
};
export type GetAllUserApiResponse = /** status 200  */ UserResponse[];
export type GetAllUserApiArg = void;
export type DeleteUserApiResponse = /** status 200  */ string;
export type DeleteUserApiArg = {
  id: string;
};
export type CreateLocationApiResponse = /** status 201  */ LocationInfo;
export type CreateLocationApiArg = {
  createLocation: CreateLocation;
};
export type FindAllLocationApiResponse = /** status 200  */ object[];
export type FindAllLocationApiArg = void;
export type FindOneLocationApiResponse = /** status 200  */ LocationInfo;
export type FindOneLocationApiArg = {
  id: string;
};
export type UpdateLocationApiResponse = /** status 200  */ LocationInfo;
export type UpdateLocationApiArg = {
  id: string;
  updateLocation: UpdateLocation;
};
export type RemoveLocationApiResponse = unknown;
export type RemoveLocationApiArg = {
  id: string;
};
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
export type UserResponse = {
  role: "admin" | "parlament" | "profesor" | "student" | "organization";
  id: string;
  email: string;
  walletAddress?: string;
  username: string;
};
export type AuthResponse = {
  token: string;
  user: UserResponse;
};
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
export type Exam = {
  id: string;
  name: string;
  time: number;
  contractId?: string;
  isReady: boolean;
  users: object;
  locations: object;
};
export type LocationInfo = {
  id: string;
  street: string;
  number: string;
  city: string;
  time: number;
  classroom: string;
  users: object;
  exam: Exam;
};
export type CreateLocation = {
  street: string;
  number: string;
  city: string;
  time: number;
  classroom: string;
};
export type UpdateLocation = {
  userIds?: string[];
  examId?: string;
};
export type CreateExamRequest = {
  name: string;
  time: number;
  locations: CreateLocation[];
};
export type UpdateExamRequest = {
  isReady: boolean;
  contractId: string;
  locations: LocationInfo[];
};
export type UploadQuestionsResponse = {
  ipfsInfo: object;
  organizationAddresses: string[];
};
export type Question = {
  text: string;
  options: string[];
  answer: number;
};
export type UploadQuestionsRequest = {
  questions: Question[];
  walletAddres: string;
  examId: string;
};
export type UpdateUserRelation = {
  userIds: string[];
};
export const {
  useSignInAuthMutation,
  useGetUserInfoAuthQuery,
  useSignUpAuthMutation,
  useLoadLocationsUserQuery,
  useGetAllUserQuery,
  useDeleteUserMutation,
  useCreateLocationMutation,
  useFindAllLocationQuery,
  useFindOneLocationQuery,
  useUpdateLocationMutation,
  useRemoveLocationMutation,
  useCreateExamMutation,
  useFindAllExamQuery,
  useFindOneExamQuery,
  useUpdateExamMutation,
  useRemoveExamMutation,
  useUploadExamMutation,
  useUpdateRelationExamMutation,
} = injectedRtkApi;
