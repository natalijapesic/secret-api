import { EditorProps } from "@/components/Editors/types";
import { Input } from "@/components/Input";
import { useFormContext } from "react-hook-form";

export default function TextEditor({ field, property }: EditorProps) {
  const { register } = useFormContext();

  const type = () => {
    if (property === "password") return property;
    return "text";
  };
  return (
    <Input
      {...register(property)}
      {...field}
      placeholder={property}
      variant="placeholder"
      type={type()}
    />
  );
}
