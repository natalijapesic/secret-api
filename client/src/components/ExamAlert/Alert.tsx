import { LocationInfo } from "@/store/api/endpoints";
import ago from "s-ago";
import styles from "./styles.module.css";
import { HiLocationMarker } from "react-icons/hi";
import { BsCalendar2Heart } from "react-icons/bs";

const ExamAlert = ({ location }: { location: LocationInfo }) => {
  const exam = location.exam;

  const humanReadable = () => {
    const format = ago(new Date(exam.time * 1000));
    if (format.includes("month")) return format;
  };

  const date = ` ${new Date(exam.time * 1000).toDateString()}`;

  return (
    <div className={styles["alert-container"]}>
      <header className={styles["exam-container"]}>
        <div>
          <span className={styles["exam-id"]}>#{exam.contractId} - </span>
          <span className={styles["exam-name"]}>{exam.name}</span>
        </div>
        <div>
          {humanReadable() && (
            <span className={styles["upcoming"]}>Starts {humanReadable()}</span>
          )}
        </div>
      </header>
      <div className={styles["exam-info"]}>
        <div className={styles["exam-location"]}>
          <HiLocationMarker size={"1.2rem"} />
          <span>
            {location.street} {location.number}, {location.city}
          </span>
          <span className={styles["exam-classroom"]}>{location.classroom}</span>
        </div>
        <span className={styles["exam-date"]}>
          <BsCalendar2Heart size={"1.1rem"} />
          {date}
        </span>
      </div>
      <div></div>
    </div>
  );
};

export default ExamAlert;
