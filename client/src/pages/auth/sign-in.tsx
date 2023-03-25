import StaticForm from "@/components/StaticForm";
import { signValues } from "@/components/StaticForm/static/auth";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";

export default function SignIn() {
  const { signIn } = useAuth();

  const onSubmit = async (data: any) => {
    signIn(data);
  };
  return (
    <StaticForm
      entity={signValues}
      title="SecretExam"
      variant="auth"
      subtitle="Enter Account"
      submit="Sign In"
      onSubmit={onSubmit}
      href="/auth/sign-up"
      route="Sign Up"
    ></StaticForm>
  );
}
