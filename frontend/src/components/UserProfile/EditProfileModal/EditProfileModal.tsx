import { useMemo, useState } from "react";

import ErrorText from "../../../common/components/Form/ErrorText/ErrorText";
import Field from "../../../common/components/Form/Field/Field";
import FormActions from "../../../common/components/Form/FormActions/FormActions";
import FormModal from "../../../common/components/Form/FormModal/FormModal";

import { useDirtyForm } from "../../../common/hooks/useDirtyForm";
import { useFormValidation } from "../../../common/hooks/useFormValidation";

import { useAuth } from "../../../store/hooks/useAuth";

import styles from "./EditProfileModal.module.css";

interface EditProfileModalProps {
  name: string | undefined;
  isOpen: boolean;
  shouldResetForm: boolean;
  onClose: () => void;
  onCloseAttempt: () => void;
  onDirtyChange: (dirty: boolean) => void;
}

const EditProfileModal = ({
  name,
  isOpen,
  shouldResetForm,
  onClose,
  onCloseAttempt,
  onDirtyChange,
}: EditProfileModalProps) => {
  const { updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const initialValues = useMemo(
    () => ({
      name: name ?? "",
    }),
    [name],
  );

  const { values, setValues, isDirty } = useDirtyForm({
    isOpen,
    shouldResetForm,
    initialValues,
    onDirtyChange,
  });

  const validator = (v: typeof values) => {
    const errors: Partial<Record<keyof typeof values, string>> = {};

    if (!v.name.trim()) errors.name = "Imię jest wymagane";
    if (v.name.trim().length < 2)
      errors.name = "Imię musi mieć co najmniej 2 znaki";

    return errors;
  };

  const { errors, validate, clearError } = useFormValidation(values, validator);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      setApiError(null);

      await updateProfile(values.name);
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
    <FormModal title="Edytuj profil" onSubmit={handleSubmit}>
      <Field label="Imię *">
        <input
          id="edit-name"
          type="text"
          className={styles.input}
          value={values.name}
          onChange={(e) => {
            clearError("name");
            setValues((v) => ({ ...v, name: e.target.value }));
          }}
        />
        <ErrorText message={errors.name} />
        {apiError && <ErrorText message={apiError} />}
        <FormActions
          loading={loading}
          submitLabel="Zapisz"
          onCancel={() => (isDirty ? onCloseAttempt() : onClose())}
        />
      </Field>
    </FormModal>
  );
};

export default EditProfileModal;
