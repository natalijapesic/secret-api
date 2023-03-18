import { LocationInfo, UserResponse } from "@/store/api/endpoints";
import { initialState } from "@/store/user/initalState";
import { Role } from "@/store/user/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUser: (state, action: PayloadAction<UserResponse>) => {
      state.id = action.payload.id;
      state.role = action.payload.role as Role;
      state.username = action.payload.username;
    },
    loadLocations: (state, action: PayloadAction<LocationInfo[]>) => {
      state.locations = action.payload;
    },
  },
});

export const { loadUser } = userSlice.actions;

export * from "./selectors";

export default userSlice.reducer;
