import { DateEditor } from "@/components/Editors/DateTimePicker";
import LocationEditor from "@/components/Editors/LocationEditor";
import { NumberEditor } from "@/components/Editors/NumberEditor";
import TextEditor from "@/components/Editors/TextEditor";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";

export type EditorProps<T extends object = any> = {
  field: ControllerRenderProps<T, FieldPath<T>>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<T>;
  property: string;
};

export const EditorMap: Record<
  string,
  (props: EditorProps) => React.ReactElement
> = {
  string: TextEditor,
  number: NumberEditor,
  object: DateEditor,
  location: LocationEditor,
};
