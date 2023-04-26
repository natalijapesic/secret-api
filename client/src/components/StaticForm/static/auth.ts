import { RegisterUser, SignUser } from "@/store/api/endpoints";

export const signValues: SignUser = {
  username: "",
  password: "",
};

export const registerValues: Partial<RegisterUser> = {
  email: "",
  jmbg: "",
  name: "",
  password: "",
  username: "",
};
