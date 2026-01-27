import { useMemo, useState } from "react";

import ErrorText from "../../../common/components/Form/ErrorText/ErrorText";
import Field from "../../../common/components/Form/Field/Field";
import FormActions from "../../../common/components/Form/FormActions/FormActions";
import FormModal from "../../../common/components/Form/FormModal/FormModal";

import { useDirtyForm } from "../../../common/hooks/useDirtyForm";
import { useFormValidation } from "../../../common/hooks/useFormValidation";

import { useLearning } from "../../../store/hooks/useLearning";

import type { LearningPath } from "../../../common/types/learning";

import styles from "./PathCreationModal.module.css";

interface PathCreationModalProps {
  path?: LearningPath | null;
  isOpen: boolean;
  shouldResetForm: boolean;
  onClose: () => void;
  onCloseAttempt: () => void;
  onDirtyChange: (dirty: boolean) => void;
}

const PathCreationModal = ({
  path,
  isOpen,
  shouldResetForm,
  onClose,
  onCloseAttempt,
  onDirtyChange,
}: PathCreationModalProps) => {
  const { createLearningPath, updateLearningPath } = useLearning();
  const [loading, setLoading] = useState(false);

  const initialValues = useMemo(
    () => ({
      name: path?.name ?? "",
      description: path?.description ?? "",
    }),
    [path],
  );

  const { values, setValues, isDirty } = useDirtyForm({
    isOpen,
    shouldResetForm,
    initialValues,
    onDirtyChange,
  });

  const validator = (v: typeof values) => {
    const errors: Partial<Record<keyof typeof values, string>> = {};

    if (!v.name.trim()) errors.name = "Nazwa jest wymagana";

    return errors;
  };

  const { errors, validate, clearError } = useFormValidation(values, validator);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    if (path) {
      await updateLearningPath(path.id, {
        name: values.name,
        description: values.description || undefined,
      });
    } else {
      await createLearningPath({
        name: values.name,
        description: values.description || undefined,
      });
    }

    setLoading(false);
    onClose();
  };

  return (
    <FormModal
      title={path ? "Edytuj ścieżkę" : "Dodaj ścieżkę"}
      onSubmit={handleSubmit}
    >
      <Field label="Nazwa *">
        <input
          id="path-name"
          className={styles.input}
          value={values.name}
          onChange={(e) => {
            clearError("name");
            setValues((v) => ({ ...v, name: e.target.value }));
          }}
        />
        <ErrorText message={errors.name} />
      </Field>
      <Field label="Opis (opcjonalnie)">
        <textarea
          id="path-desc"
          className={styles.textarea}
          rows={4}
          value={values.description}
          onChange={(e) =>
            setValues((v) => ({ ...v, description: e.target.value }))
          }
        />
      </Field>
      <FormActions
        loading={loading}
        submitLabel={path ? "Zapisz zmiany" : "Dodaj"}
        onCancel={() => (isDirty ? onCloseAttempt() : onClose())}
      />
    </FormModal>
  );
};

export default PathCreationModal;
