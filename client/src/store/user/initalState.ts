import { LocationInfo } from "@/store/api/endpoints";
import { Role } from "@/store/user/types";

export interface UserState {
  id?: string;
  role: Role;
  username?: string;
  examLocations: Record<string, LocationInfo>;
}

export const initialState: UserState = {
  role: Role.Student,
  examLocations: {},
};
