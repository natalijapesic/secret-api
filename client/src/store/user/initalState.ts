import { Role, UserState } from "@/store/user/types";

export const initialState: UserState = {
  role: Role.Student,
  locations: [],
};
