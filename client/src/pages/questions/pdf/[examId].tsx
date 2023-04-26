import GeneratePdf from "@/components/GeneratePdf";
import { useExam } from "@/hooks/useExam";
import { RootState } from "@/store";
import { Question } from "@/store/api/endpoints";
import { selectExamById } from "@/store/exam";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function PdfPreview() {
  const router = useRouter();
  const { examId } = router.query;
  if (!examId) return;
  const { startExam } = useExam();
  const [questions, setQuestions] = useState<Question[]>([]);

  if (!examId || Array.isArray(examId)) throw new Error("Error should has id");

  const exam = useSelector((state: RootState) => selectExamById(state, examId));

  if (!exam) throw new Error(`Exam with id ${examId} does not exist`);

  useEffect(() => {
    (async () => {
      const questions = await startExam(exam);
      if (questions) {
        setQuestions(questions.questions);
      }
    })();
  }, []);

  useEffect(() => {
    if (questions.length) {
      setTimeout(() => {
        window.print();
      }, 1000);
    }
  }, [questions]);

  return questions && <GeneratePdf exam={exam} questions={questions} />;
}
