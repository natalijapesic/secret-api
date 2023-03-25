import Link from "next/link";
import styles from "./header.module.css";

export const Header = () => {
  return (
    <header className={styles["header-container"]}>
      <div className={styles["header-container__brand"]}>SecretExam</div>
      <nav className={styles["header-container__nav"]}>
        {/* <Link className={styles.nav__link} href="/create">
          Create Exam
        </Link> */}
      </nav>
    </header>
  );
};
