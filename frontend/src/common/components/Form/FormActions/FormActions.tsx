import styles from "../form.module.css";

interface FormActionsProps {
  loading: boolean;
  submitLabel: string;
  onCancel: () => void;
}

const FormActions = ({ loading, submitLabel, onCancel }: FormActionsProps) => {
  return (
    <div className={styles.actions}>
      <button type="button" className={styles.cancel} onClick={onCancel}>
        Anuluj
      </button>
      <button type="submit" className={styles.submit} disabled={loading}>
        {loading ? "Zapisywanie..." : submitLabel}
      </button>
    </div>
  );
};

export default FormActions;
