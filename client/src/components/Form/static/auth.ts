import { RegisterUser, SignUser } from "@/store/api/endpoints";

export const signValues: SignUser = {
  password: "",
  username: "",
};

export const registerValues: Partial<RegisterUser> = {
  email: "",
  jmbg: "",
  name: "",
  password: "",
  username: "",
};
