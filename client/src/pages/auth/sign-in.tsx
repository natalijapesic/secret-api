import StaticForm from "@/components/Form";
import { signValues } from "@/components/Form/static/auth";
import { useAuth } from "@/hooks/useAuth";

export default function SignIn() {
  const { signIn } = useAuth();

  const onSubmit = async (data: any) => {
    signIn(data);
  };
  return (
    <StaticForm
      entity={signValues}
      title={"Enter Account"}
      submit={"Sign In"}
      onSubmit={onSubmit}
    ></StaticForm>
  );
}
