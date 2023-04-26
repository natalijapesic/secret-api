import Link from "next/link";
import styles from "./header.module.css";

export const Header = () => {
  return (
    <header className={styles["header-container"]}>
      <Link href="/" className={styles["header-container__brand"]}>
        SecretExam
      </Link>
      <nav className={styles["header-container__nav"]}>
      </nav>
    </header>
  );
};
