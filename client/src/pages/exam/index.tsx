import AlertList from "@/components/ExamAlert";
import ExamGrid from "@/components/ExamGrid";
import { useExam } from "@/hooks/useExam";
import { useEffect } from "react";
import styles from "./styles.module.css";

const Exam = () => {
  const { loadExams } = useExam();

  useEffect(() => {
    loadExams();
  }, []);

  return (
    <div className={styles["container"]}>
      <div className={styles["container-item"]}>
        <header className={styles["heading"]}>My Exams</header>
        <AlertList />
        <header className={styles["heading"]}>Browse Exams</header>
        <ExamGrid />
      </div>
    </div>
  );
};

export default Exam;
