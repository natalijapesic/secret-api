import Button from "@/components/Button";
import AlertList from "@/components/ExamAlert";
import ExamGrid from "@/components/ExamGrid";
import { Header } from "@/components/header";
import { useExam } from "@/hooks/useExam";
import { selectExamsData } from "@/store/exam";
import Link from "next/link";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";

const Exam = () => {
  const { loadExams } = useExam();
  const exams = useSelector(selectExamsData);

  useEffect(() => {
    if (!exams.length) loadExams();
  }, []);

  return (
    <>
      <Header></Header>
      <div className={styles["container"]}>
        <div className={styles["container-item"]}>
          <header className={styles["heading"]}>My Exams</header>
          <AlertList />
          <header className={styles["browser-container"]}>
            <h2 className={styles["heading"]}>Browse Exams</h2>
            <Link href={"/exam/create"}>
              <Button variant="secondary">Create Exam</Button>
            </Link>
          </header>
          <ExamGrid />
        </div>
      </div>
    </>
  );
};

export default Exam;
