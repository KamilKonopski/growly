import styles from "./Spinner.module.css";

type SpinnerProps = {
  size?: number;
  label?: string;
};

export const Spinner = ({ size = 48, label }: SpinnerProps) => {
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.spinner}
        style={{ width: size, height: size }}
        aria-label="Loading"
      >
        <span className={styles.dot} />
      </div>

      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
};
