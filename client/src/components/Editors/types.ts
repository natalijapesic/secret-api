import { NumberEditor } from "@/components/Editors/NumberEditor";
import TextEditor from "@/components/Editors/TextEditor";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";

export type EditorProps = {
  field: ControllerRenderProps<FieldValues, FieldPath<FieldValues>>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
  property: string;
};

export const EditorMap: Record<
  string,
  (props: EditorProps) => React.ReactElement
> = {
  string: TextEditor,
  number: NumberEditor,
};
