import { EditorMap } from "@/components/Editors/types";
import { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

export const StaticForm = ({ entity }: { entity: any }) => {
  const methods = useForm({ defaultValues: entity });

  useEffect(() => {
    methods.reset(entity);
  }, [entity]);

  const { handleSubmit, control } = methods;

  const onSubmit = (data: any) => {
    console.log(data);
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
      </form>
    </FormProvider>
  );
};
