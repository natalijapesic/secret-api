import GenerateQRCode from "@/components/QR";
import { Exam, Question } from "@/store/api/endpoints";
import { selectUser } from "@/store/user";
import { INFO, WARNING } from "@/types/constants";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function GeneratePdf({
  exam,
  questions,
}: {
  exam: Exam;
  questions: Question[];
}) {
  const title = capitalizeFirstLetter(exam.name);
  const user = useSelector(selectUser);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>{title}</h1>
        <div className={styles["qr-code"]}>
          <GenerateQRCode jmbg={"0302998735056"} />
        </div>
      </header>
      <div>{INFO}</div>
      <span className="warning">{WARNING}</span>
      <ol>
        {questions.map((question, index) => {
          return (
            <li key={index} className={styles.question}>
              <span>{question.text}</span>
              <ol type="a" className={styles.options}>
                {question.options.map((option, index) => (
                  <li className="question-text" key={`option-${index}`}>
                    {option}
                  </li>
                ))}
              </ol>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default GeneratePdf;
