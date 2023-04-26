import { EditorProps } from "@/components/Editors/types";
import { Input } from "@/components/Input";
import { useFormContext } from "react-hook-form";

export function DateEditor({ field, property }: EditorProps) {
  const { register } = useFormContext();

  return (
    <Input
      {...register(property)}
      {...field}
      type="datetime-local"
      variant="placeholder"
      placeholder={property}
    />
  );
}
