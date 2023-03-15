import { RegisterUser, SignUser } from "@/store/api/endpoints";

export const signValues: SignUser = {
  password: "",
  username: "",
};

export const registerValues: RegisterUser = {
  email: "",
  jmbg: "",
  name: "",
  password: "",
  role: "student",
  username: "",
  walletAddress: "wallet",
};
