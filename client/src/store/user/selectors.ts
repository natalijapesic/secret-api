import { RootState } from "@/store";
import { User } from "@/store/user/types";

export const selectUser = (state: RootState): User => state.user.instance;

export const selectLocations = (state: RootState) => state.user.locations;
