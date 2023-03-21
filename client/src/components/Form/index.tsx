import Button from "@/components/Button";
import { EditorMap } from "@/components/Editors/types";
import Link from "next/link";
import { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import styles from "./styles.module.css";

const StaticForm = ({
  entity,
  title,
  submit,
  onSubmit,
  route,
  href,
}: {
  entity: any;
  title: string;
  submit: string;
  onSubmit: (data: any) => void;
  route: string;
  href: string;
}) => {
  const methods = useForm({ defaultValues: entity });

  useEffect(() => {
    methods.reset(entity);
  }, [entity]);

  const { handleSubmit, control } = methods;

  return (
    <div className={styles["form-container"]}>
      <div className={styles["form-item"]}>
        <header className={styles["app-header"]}>Secret exam</header>
        <span className={styles["title"]}>{title}</span>
        <FormProvider {...methods}>
          <form className={styles["form"]} onSubmit={handleSubmit(onSubmit)}>
            {Object.keys(entity).map((property) => {
              const Editor = EditorMap[typeof property];
              return (
                <div key={property}>
                  <Controller
                    name={property}
                    control={control}
                    rules={{ required: true }}
                    render={(props) => (
                      <Editor {...props} property={property} />
                    )}
                  />
                </div>
              );
            })}
            <div className={styles["form-controls"]}>
              <Button variant={"primary"}>{submit}</Button>
              <Button variant={"secondary"}>
                <Link href={href}>{route}</Link>
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default StaticForm;
