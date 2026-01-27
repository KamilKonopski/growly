import styles from "../form.module.css";

interface FieldProps {
  label: string;
  children: React.ReactNode;
}

const Field = ({ label, children }: FieldProps) => {
  return (
    <label className={styles.label}>
      {label}
      {children}
    </label>
  );
};

export default Field;
