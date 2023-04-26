import { Role, UserState } from "@/store/user/types";

export const initialState: UserState = {
  instance: { role: Role.Student, id: null, username: null, jmbg: null },
  locations: [],
  token: null,
};
