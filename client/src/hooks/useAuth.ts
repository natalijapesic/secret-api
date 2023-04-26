import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import {
  RegisterUser,
  SecretApi as Api,
  SignUser,
} from "@/store/api/endpoints";
import { loadUser } from "@/store/user";
import { Role } from "@/store/user/types";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ClientContext } from "@/types/clientContext";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { client } = useContext(ClientContext);
  const router = useRouter();

  const signIn = async (data: SignUser) => {
    const response = await dispatch(
      Api.endpoints["signInAuth"].initiate({ signUser: data })
    ).unwrap();

    if (response) {
      dispatch(loadUser(response));
      router.push(`/`);
    }
  };

  const signUp = async (data: RegisterUser) => {
    if (!client) throw new Error("Client must be signed");

    const response = await dispatch(
      Api.endpoints["signUpAuth"].initiate({
        registerUser: {
          ...data,
          walletAddress: client.address,
          role: Role.Student,
        },
      })
    ).unwrap();

    if (response) {
      dispatch(loadUser(response));
      router.push(`/`);
    }
  };

  return { signIn, signUp };
};
