import Button from "@/components/Button";
import { Input } from "@/components/Input";
import StaticForm from "@/components/StaticForm";
import { CreateExam } from "@/components/StaticForm/static/create-exam";
import { useExam } from "@/hooks/useExam";
import { CreateExamRequest, CreateLocation } from "@/store/api/endpoints";
import styles from "./styles.module.css";
import { useFieldArray, useForm } from "react-hook-form";

export default function ExamForm() {
  const { createExam } = useExam();

  const { handleSubmit, register, control } = useForm<CreateExam>({
    defaultValues: {
      locations: [
        {
          city: "",
          classroom: "",
          number: "",
          street: "",
        },
      ],
    },
  });

  const { append, fields } = useFieldArray({
    name: "locations",
    control,
  });

  const onSubmit = (data: CreateExam) => {
    const time = new Date(data.time).getTime() / 1000;
    const locations = data.locations.map((location) => {
      return {
        ...location,
        time,
      };
    });
    const request: CreateExamRequest = {
      name: data.name,
      time,
      locations,
    };

    createExam(request);
  };

  return (
    <section className={styles["page-layout"]}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles["form-container"]}
      >
        <div className={styles.form}>
          <header>
            <h1 className={styles.heading}>Create Exam</h1>
          </header>
          <div>
            <h3>General Information</h3>
            <div className={styles["general-inputs"]}>
              <Input type="text" placeholder="Name" {...register(`name`)} />
              <Input
                type="date"
                placeholder="Exam Time"
                {...register("time")}
              />
            </div>
          </div>
          <div className={styles["location-form"]}>
            <h3 className={styles.subheading}>Locations</h3>
            <div className={styles["location-entries"]}>
              {fields.map((field, index) => {
                return (
                  <div key={field.id}>
                    <section className={styles["location-inputs"]}>
                      <Input
                        type="text"
                        placeholder="City"
                        {...register(`locations.${index}.city`)}
                      />
                      <Input
                        type="text"
                        placeholder="Classroom"
                        {...register(`locations.${index}.classroom`)}
                      />
                      <Input
                        type="text"
                        placeholder="Street Number"
                        {...register(`locations.${index}.number`)}
                      />
                      <Input
                        type="text"
                        placeholder="Street"
                        {...register(`locations.${index}.street`)}
                      />
                    </section>
                  </div>
                );
              })}
            </div>
            <Button
              type="button"
              variant="secondary"
              style={{
                width: "100%",
              }}
              onClick={() =>
                append({ city: "", classroom: "", number: "", street: "" })
              }
            >
              Add Location
            </Button>
          </div>
        </div>

        <Button type="submit" variant="primary">
          Submit
        </Button>
      </form>
    </section>
  );
}
