import StaticForm from "@/components/Form";
import { registerValues } from "@/components/Form/static/auth";

export default function SignUp() {
  return (
    <div>
      <StaticForm
        entity={registerValues}
        title={"Create Account"}
        submit={"Sign Up"}
      ></StaticForm>
    </div>
  );
}
