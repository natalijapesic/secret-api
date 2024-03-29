import ExamAlert from "@/components/ExamAlert/Alert";
import { useExam } from "@/hooks/useExam";
import storageService from "@/services/storage.service";
import { selectLocations } from "@/store/user";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";

const AlertList = () => {
  const locations = useSelector(selectLocations);
  const { loadExamLocations } = useExam();

  useEffect(() => {
    const user = storageService.getUser();
    if (!user || !user.id) return;
    loadExamLocations(user.id);
  }, []);

  return (
    <div className={styles["list-container"]}>
      {locations.map((location) => (
        <ExamAlert key={location.id} location={location} />
      ))}
    </div>
  );
};

export default AlertList;
