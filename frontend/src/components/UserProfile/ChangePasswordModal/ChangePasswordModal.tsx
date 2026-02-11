import { useMemo, useState } from "react";

import ErrorText from "../../../common/components/Form/ErrorText/ErrorText";
import Field from "../../../common/components/Form/Field/Field";
import FormActions from "../../../common/components/Form/FormActions/FormActions";
import FormModal from "../../../common/components/Form/FormModal/FormModal";

import { useDirtyForm } from "../../../common/hooks/useDirtyForm";
import { useFormValidation } from "../../../common/hooks/useFormValidation";

import { useAuth } from "../../../store/hooks/useAuth";

import styles from "./ChangePasswordModal.module.css";

interface ChangePasswordModalProps {
  isOpen: boolean;
  shouldResetForm: boolean;
  onClose: () => void;
  onCloseAttempt: () => void;
  onDirtyChange: (dirty: boolean) => void;
}

const ChangePasswordModal = ({
  isOpen,
  shouldResetForm,
  onClose,
  onCloseAttempt,
  onDirtyChange,
}: ChangePasswordModalProps) => {
  const { changePassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const initialValues = useMemo(
    () => ({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }),
    [],
  );

  const { values, setValues, isDirty } = useDirtyForm({
    isOpen,
    shouldResetForm,
    initialValues,
    onDirtyChange,
  });

  const validator = (v: typeof values) => {
    const errors: Partial<Record<keyof typeof values, string>> = {};

    if (!v.currentPassword) errors.currentPassword = "Podaj aktualne hasło";

    if (v.newPassword.length < 8)
      errors.newPassword = "Hasło musi mieć min. 8 znaków";

    if (v.newPassword !== v.confirmPassword)
      errors.confirmPassword = "Hasła nie są takie same";

    return errors;
  };

  const { errors, validate, clearError } = useFormValidation(values, validator);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      setApiError(null);
      await changePassword(values.currentPassword, values.newPassword);
      onClose();
    } catch (e: unknown) {
      if (e instanceof Error) {
        setApiError(e.message ?? "Błąd zapisu danych");
      } else {
        setApiError("Błąd zapisu danych");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormModal title="Zmień hasło" onSubmit={handleSubmit}>
      <Field label="Aktualne hasło *">
        <input
          id="current-password"
          type="password"
          className={styles.input}
          value={values.currentPassword}
          onChange={(e) => {
            clearError("currentPassword");
            setValues((v) => ({ ...v, currentPassword: e.target.value }));
          }}
        />
        <ErrorText message={errors.currentPassword} />
      </Field>

      <Field label="Nowe hasło *">
        <input
          id="new-password"
          type="password"
          className={styles.input}
          value={values.newPassword}
          onChange={(e) => {
            clearError("newPassword");
            setValues((v) => ({ ...v, newPassword: e.target.value }));
          }}
        />
        <ErrorText message={errors.newPassword} />
      </Field>

      <Field label="Powtórz nowe hasło *">
        <input
          id="confirm-password"
          type="password"
          className={styles.input}
          value={values.confirmPassword}
          onChange={(e) => {
            clearError("confirmPassword");
            setValues((v) => ({ ...v, confirmPassword: e.target.value }));
          }}
        />
        <ErrorText message={errors.confirmPassword} />
      </Field>

      {apiError && <ErrorText message={apiError} />}

      <FormActions
        loading={loading}
        submitLabel="Zmień hasło"
        onCancel={() => (isDirty ? onCloseAttempt() : onClose())}
      />
    </FormModal>
  );
};

export default ChangePasswordModal;
