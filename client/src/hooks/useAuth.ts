import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import {
  RegisterUser,
  SecretApi as Api,
  SignUser,
} from "@/store/api/endpoints";
import { loadUser } from "@/store/user";
import { Role } from "@/store/user/types";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  const signIn = async (data: SignUser) => {
    const response = await dispatch(
      Api.endpoints["signInAuth"].initiate({ signUser: data })
    ).unwrap();

    dispatch(loadUser(response));
  };

  const signUp = async (data: RegisterUser) => {
    //TODO: wallet addres by extension
    const response = await dispatch(
      Api.endpoints["signUpAuth"].initiate({
        registerUser: { ...data, walletAddress: "uknown", role: Role.Student },
      })
    ).unwrap();

    dispatch(loadUser(response));
  };

  return { signIn, signUp };
};
