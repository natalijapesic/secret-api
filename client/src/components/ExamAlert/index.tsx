import { Exam } from "@/store/api/endpoints";
import styles from "./styles.module.css";

const ExamAlert = ({ exam }: { exam: Exam }) => {
  const upcoming = () => {
    const offset = Math.abs(
      new Date(exam.time).getTime() - new Date().getTime()
    );

    const hours = offset / (60 * 60 * 1000);

    return hours <= 24;
  };

  return (
    <div className={styles["alert-container"]}>
      <header>
        <span>#{exam.contractId}</span>
        <span>
          {exam.course} - {exam.name}
        </span>
        <button onClick={upcoming}> Upcoming </button>
      </header>
      <div>
        
      </div>
    </div>
  );
};

export default ExamAlert;
