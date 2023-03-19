import StaticForm from "@/components/Form";
import { registerValues } from "@/components/Form/static/auth";
import { useAuth } from "@/hooks/useAuth";

export default function SignUp() {
  const { signUp } = useAuth();

  const onSubmit = (data: any) => {
    signUp(data);
  };

  return (
    <div>
      <StaticForm
        entity={registerValues}
        title={"Create Account"}
        submit={"Sign Up"}
        onSubmit={onSubmit}
      ></StaticForm>
    </div>
  );
}
