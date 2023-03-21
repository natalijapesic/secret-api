import { EditorProps } from "@/components/Editors/types";
import { Input } from "@/components/Input";
import { useFormContext } from "react-hook-form";
import styles from "./styles.module.css";

export default function TextEditor({ field, property }: EditorProps) {
  const { register } = useFormContext();

  return (
    <Input
      {...register(property)}
      {...field}
      placeholder={property}
      variant="placeholder"
    />
  );
}
