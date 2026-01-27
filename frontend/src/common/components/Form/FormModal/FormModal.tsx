import styles from "../form.module.css";

interface FormModalProps {
  title: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
}

const FormModal = ({ title, children, onSubmit }: FormModalProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  );
};

export default FormModal;
