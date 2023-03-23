import Button from "@/components/Button";
import { EditorProps } from "@/components/Editors/types";
import { CreateExam } from "@/components/StaticForm/static/create-exam";
import { CreateExamRequest, LocationInfo } from "@/store/api/endpoints";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function LocationEditor({ field }: EditorProps) {
  const { register, control } = useFormContext<CreateExam>();

  const { fields, append } = useFieldArray({
    name: "locations",
    control,
  });

  return (
    <div>
      <Button
        variant="secondary"
        onClick={() =>
          append({
            city: "",
            classroom: "",
            number: "",
            street: "",
          })
        }
      >
        Add
      </Button>
      <ul>
        {fields.map((f, index) => {
          return <li>aa</li>;
        })}
      </ul>
    </div>
  );
}
