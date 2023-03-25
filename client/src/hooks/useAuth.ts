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

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
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
    //TODO: wallet addres by extension
    const response = await dispatch(
      Api.endpoints["signUpAuth"].initiate({
        registerUser: { ...data, walletAddress: "uknown", role: Role.Student },
      })
    ).unwrap();

    if (response) {
      dispatch(loadUser(response));
      router.push(`/`);
    }
  };

  return { signIn, signUp };
};
