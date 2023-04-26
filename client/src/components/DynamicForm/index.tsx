import Button from "@/components/Button";
import { EditorMap } from "@/components/Editors/types";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import styles from "./styles.module.css";

const DynamicForm = ({
  entity,
  onSubmit,
}: {
  entity: any;
  onSubmit: (data: any) => void;
}) => {
  const methods = useForm();
  const { handleSubmit, control } = methods;

  const { fields, append } = useFieldArray({ name: "dynamic", control });

  return (
    <div className={styles["list-container"]}>
      <div className={styles[`list-item`]}>
        <header className={styles[`form-title`]}>Location</header>
        <FormProvider {...methods}>
          <form className={styles[`form`]} onSubmit={handleSubmit(onSubmit)}>
            {fields.map((item, index) => {
              const { id, ...resposne } = item;
              return Object.entries(resposne).map(([property, value]) => {
                const Editor = EditorMap[typeof value];
                return (
                  <Controller
                    key={`${property}-${index}`}
                    name={`dynamic[${index}].${property}`}
                    control={control}
                    rules={{ required: true }}
                    render={(props) => (
                      //@ts-ignore
                      <Editor
                        key={`${property}-${item.id}`}
                        {...props}
                        property={property}
                      />
                    )}
                  />
                );
              });
            })}
            <div className={styles[`form-controls`]}>
              <Button variant={"primary"}>Save</Button>
              <Button
                variant={"secondary"}
                type="button"
                onClick={() => append(entity)}
              >
                Add Location
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default DynamicForm;
