import StaticForm from "@/components/StaticForm";
import { registerValues } from "@/components/StaticForm/static/auth";
import { useAuth } from "@/hooks/useAuth";

export default function SignUp() {
  const { signUp } = useAuth();

  const onSubmit = (data: any) => {
    signUp(data);
  };

  return (
    <StaticForm
      entity={registerValues}
      title="SecretExam"
      variant="auth"
      subtitle="Create Account"
      submit={"Sign Up"}
      onSubmit={onSubmit}
      href="/auth/sign-in"
      route="Sign In"
    ></StaticForm>
  );
}
