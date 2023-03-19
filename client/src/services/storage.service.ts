import { UserResponse } from "@/store/api/endpoints";
import { Role, User } from "@/store/user/types";

class StoreService {
  setAccessToken(token: string) {
    localStorage.setItem("accessToken", JSON.stringify(token));
  }

  setUser(response: UserResponse) {
    const user: User = {
      id: response.id,
      role: response.role as Role,
      username: response.role,
    };
    localStorage.setItem("user", JSON.stringify(user));
  }

  getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
  }

  getUser(): User | null {
    const dataFromStorage = localStorage.getItem("user");
    if (dataFromStorage) return JSON.parse(dataFromStorage);
    else return null;
  }

  removeFromStorage(key: string) {
    localStorage.removeItem(key);
  }
}

export default new StoreService();
