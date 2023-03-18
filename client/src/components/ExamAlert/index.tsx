import ExamAlert from "@/components/ExamAlert/Alert";
import { RootState } from "@/store";
import { selectExamsData } from "@/store/exam";
import { useSelector } from "react-redux";

const AlertList = () => {
  const exams = useSelector((state: RootState) => selectExamsData(state));
  return (
    <div>
      {exams.map((exam) => (
        <ExamAlert key={exam.id} exam={exam} />
      ))}
    </div>
  );
};

export default AlertList;
