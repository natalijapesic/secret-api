import { RootState } from "@/store";
import { User } from "@/store/user/types";

export const selectUser = (state: RootState): User => {
  return {
    id: state.user.id,
    role: state.user.role,
    username: state.user.username,
  };
};

export const selectLocations = (state: RootState) => state.user.locations;
