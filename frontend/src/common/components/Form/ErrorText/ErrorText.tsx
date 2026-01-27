import styles from "../form.module.css";

interface ErrorTextProps {
  message?: string;
}

const ErrorText = ({ message }: ErrorTextProps) =>
  message ? <span className={styles.error}>{message}</span> : null;

export default ErrorText;
