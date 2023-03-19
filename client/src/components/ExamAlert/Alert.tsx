import { LocationInfo } from "@/store/api/endpoints";
import ago from "s-ago";
import styles from "./styles.module.css";

const ExamAlert = ({ location }: { location: LocationInfo }) => {
  const exam = location.exam;
  const test = ago(new Date(new Date(exam.time * 1000)));
  console.log(test);

  return (
    <div className={styles["alert-container"]}>
      <header>
        <span>#{exam.contractId}</span>
        <span>
          {exam.course} - {exam.name}
        </span>
      </header>
      <div></div>
    </div>
  );
};

export default ExamAlert;
