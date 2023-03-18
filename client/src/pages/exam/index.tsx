import AlertList from "@/components/ExamAlert";
import ExamGrid from "@/components/ExamGrid";
import { useExamPage } from "@/hooks/useExam";
import { useEffect } from "react";
import styles from "./styles.module.css";

const Exam = () => {
  const { loadExams } = useExamPage();

  useEffect(() => {
    loadExams();
  }, []);

  return (
    <div className={styles["container"]}>
      <div>
        <AlertList />
      </div>
      <ExamGrid />
    </div>
  );
};

export default Exam;
