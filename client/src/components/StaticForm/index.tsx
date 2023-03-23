import Button from "@/components/Button";
import { EditorMap } from "@/components/Editors/types";
import Link from "next/link";
import { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import styles from "./styles.module.css";

const StaticForm = ({
  entity,
  title,
  subtitle,
  variant,
  submit,
  onSubmit,
  route,
  href,
}: {
  entity: any;
  subtitle: string;
  variant: string;
  title: string;
  submit: string;
  onSubmit: (data: any) => void;
  route?: string;
  href?: string;
}) => {
  const methods = useForm({ defaultValues: entity });

  useEffect(() => {
    methods.reset(entity);
  }, [entity]);

  const { handleSubmit, control } = methods;

  return (
    <div className={styles[`form-container`]}>
      <div className={styles[`form-item-${variant}`]}>
        <header className={styles[`form-title-${variant}`]}>{title}</header>
        <span className={styles[`form-subtitle-${variant}`]}>{subtitle}</span>
        <FormProvider {...methods}>
          <form
            className={styles[`form-${variant}`]}
            onSubmit={handleSubmit(onSubmit)}
          >
            {Object.entries(entity).map(([property, value]) => {
              const Editor = Array.isArray(value)
                ? EditorMap["location"]
                : EditorMap[typeof value];

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
            <div className={styles[`form-controls-${variant}`]}>
              <Button variant={"primary"}>{submit}</Button>
              {href && (
                <Button variant={"secondary"}>
                  <Link href={href}>{route}</Link>
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default StaticForm;
