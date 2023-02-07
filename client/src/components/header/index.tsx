import styles from './header.module.css';

export const Header = () => {
    return (
        <header className={styles['header-container']}>
            <div className={styles['header-container__brand']}>SecretExam</div>
            <nav className={styles['header-container__nav']}>
                <a className={styles.nav__link}>Create Exam</a>
                <a className={styles.nav__link}>Exams</a>
            </nav>
        </header>
    );
};
