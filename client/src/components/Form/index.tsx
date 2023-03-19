import { EditorMap } from "@/components/Editors/types";
import Controlls from "@/components/Form/Controlls";
import { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

const StaticForm = ({
  entity,
  title,
  submit,
  onSubmit,
}: {
  entity: any;
  title: string;
  submit: string;
  onSubmit: (data: any) => void;
}) => {
  const methods = useForm({ defaultValues: entity });

  useEffect(() => {
    methods.reset(entity);
  }, [entity]);

  const { handleSubmit, control } = methods;

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
