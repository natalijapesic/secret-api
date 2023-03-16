import { EditorMap } from "@/components/Editors/types";
import Controlls from "@/components/Form/Controlls";
import { useSignInAuthMutation, useSignUpAuthMutation } from "@/store/api/endpoints";
import { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

const StaticForm = ({
  entity,
  title,
  submit,
}: {
  entity: any;
  title: string;
  submit: string;
}) => {
  const methods = useForm({ defaultValues: entity });

  useEffect(() => {
    methods.reset(entity);
  }, [entity]);

  const { handleSubmit, control } = methods;
  const [signIn] = useSignInAuthMutation();
  const [signUp] = useSignUpAuthMutation();

  const onSubmit = async (data: any) => {
    // const response = await signIn({ signUser: data }).unwrap();
    const response = await signUp({registerUser: data})
    console.log(response);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(entity).map((property) => {
          const Editor = EditorMap[typeof property];
          return (
            <div key={property}>
              <Controller
                name={property}
                control={control}
                rules={{ required: true }}
                render={(props) => <Editor {...props} property={property} />}
              />
            </div>
          );
        })}
        <Controlls innerHTML="Submit" />
      </form>
    </FormProvider>
  );
};

export default StaticForm;
