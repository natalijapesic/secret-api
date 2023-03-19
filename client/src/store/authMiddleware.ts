import storageService from "@/services/storage.service";
import { AuthResponse } from "@/store/api/endpoints";
import { Middleware } from "@reduxjs/toolkit";

interface NextResponse {
  payload: AuthResponse;
  type: string;
}

const storeUser: Middleware = (store) => (next) => (action) => {
  let result: NextResponse = next(action);

  if (result.type === "user/loadUser") {
    storageService.setAccessToken(result.payload.token);

    const user = result.payload.user;
    storageService.setUser(user);
  }
};

export default storeUser;
