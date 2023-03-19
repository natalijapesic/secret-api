import StaticForm from "@/components/Form";
import { signValues } from "@/components/Form/static/auth";
import { useAuth } from "@/hooks/useAuth";

export default function SignIn() {
  const { signIn } = useAuth();

  const onSubmit = (data: any) => {
    signIn(data);
  };
  return (
    <div>
      <StaticForm
        entity={signValues}
        title={"Enter Account"}
        submit={"Sign In"}
        onSubmit={onSubmit}
      ></StaticForm>
    </div>
  );
}
