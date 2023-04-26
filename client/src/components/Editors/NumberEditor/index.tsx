import { EditorProps } from "@/components/Editors/types";
import { Input } from "@/components/Input";
import { useFormContext } from "react-hook-form";

export function NumberEditor({ field, property }: EditorProps) {
  const { register } = useFormContext();

  return (
    <Input
      {...register(property)}
      {...field}
      type="number"
      variant="placeholder"
      placeholder={property}
    />
  );
}
