import { EditorProps } from "@/components/Editors/types";
import { useFormContext } from "react-hook-form";
import styles from "./styles.module.css";

export function NumberEditor({ field, property }: EditorProps) {
  const { register } = useFormContext();

  return (
    <div className={styles["editor__container"]}>
      <input {...register(property)} {...field} type="number" placeholder={property} />
    </div>
  );
}
