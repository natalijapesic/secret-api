import { AuthResponse, LocationInfo } from "@/store/api/endpoints";
import { initialState } from "@/store/user/initalState";
import { Role } from "@/store/user/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUser: (state, action: PayloadAction<AuthResponse>) => {
      state.user.id = action.payload.user.id;
      state.user.role = action.payload.user.role as Role;
      state.user.username = action.payload.user.username;
      state.token = action.payload.token;
    },
    loadLocations: (state, action: PayloadAction<LocationInfo[]>) => {
      state.locations = action.payload;
    },
  },
});

export const { loadUser, loadLocations } = userSlice.actions;

export * from "./selectors";

export default userSlice.reducer;
