import StaticForm from "@/components/Form";
import { signValues } from "@/components/Form/static/auth";
import { useSignInAuthMutation } from "@/store/api/endpoints";

export default function SignIn() {
  return (
    <div>
      <StaticForm
        entity={signValues}
        title={"Create Account"}
        submit={"Sign In"}
      ></StaticForm>
    </div>
  );
}
