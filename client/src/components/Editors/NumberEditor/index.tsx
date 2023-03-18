import { EditorProps } from "@/components/Editors/types";
import { useFormContext } from "react-hook-form";
import styles from "./styles.module.css";

export function NumberEditor({ field, property }: EditorProps) {
  const { register } = useFormContext();

  return (
    <div className={styles["editor__container"]}>
      <label className={styles["editor__label"]}>{property}</label>
      <input {...register(property)} {...field} type="number" />
    </div>
  );
}
