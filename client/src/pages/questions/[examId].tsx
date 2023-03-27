import Button from "@/components/Button";
import { Header } from "@/components/header";
import { Input } from "@/components/Input";
import { useExam } from "@/hooks/useExam";
import { RootState } from "@/store";
import { Question } from "@/store/api/endpoints";
import { selectExamById } from "@/store/exam";
import { useRouter } from "next/router";
import { useFieldArray, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";

export default function CreateQuestions() {
  const router = useRouter();
  const { examId } = router.query;
  const { uploadExam } = useExam();

  if (!examId || Array.isArray(examId)) throw new Error("Error should has id");

  const exam = useSelector((state: RootState) => selectExamById(state, examId));

  const { register, control, handleSubmit } = useForm<{
    questions: Question[];
  }>({
    defaultValues: {
      questions: [
        {
          answer: 0,
          options: [],
          text: "",
        },
      ],
    },
  });

  const { append, fields } = useFieldArray({
    name: "questions",
    control,
  });

  const onSubmit = async (data: { questions: Question[] }) => {
    if (!exam) throw new Error(`Exam with id ${examId} does not exist`);

    uploadExam(data.questions, exam);
  };

  return (
    <>
      <Header></Header>
      <section className={styles.container}>
        <header>
          <h1 className={styles.heading}>Add Questions</h1>
          <span>{exam?.name}</span>
        </header>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles["form-container"]}
        >
          <div className={styles["form-contents"]}>
            <div>
              {fields.map((f, index) => {
                return (
                  <div
                    key={`question-${index}`}
                    className={styles["question-container"]}
                  >
                    <h4 className={styles["question-indicator"]}>
                      #{index + 1}
                    </h4>
                    <Input
                      placeholder="Question Body"
                      type="text"
                      {...register(`questions.${index}.text`)}
                    />
                    <div className={styles["answer-layout"]}>
                      {Array.from({ length: 4 }).map((_, answerIndex) => {
                        return (
                          <div
                            key={`question-a-${answerIndex}`}
                            className={styles["answer-inputs"]}
                          >
                            <Input
                              placeholder={`Answer ${answerIndex + 1}`}
                              type="text"
                              {...register(
                                `questions.${index}.options.${answerIndex}`
                              )}
                            />
                            <input
                              type="radio"
                              {...register(`questions.${index}.answer`)}
                              value={answerIndex}
                              id={f.id}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <Button
              variant="secondary"
              type="button"
              className={styles["add-button"]}
              onClick={() =>
                append({
                  answer: 0,
                  options: [],
                  text: "",
                })
              }
            >
              Add Question
            </Button>
          </div>
          <Button variant="primary" type="submit">
            Finalize
          </Button>
        </form>
      </section>
    </>
  );
}
