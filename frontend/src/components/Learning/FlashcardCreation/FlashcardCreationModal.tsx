import { useMemo, useState } from "react";

import ErrorText from "../../../common/components/Form/ErrorText/ErrorText";
import Field from "../../../common/components/Form/Field/Field";
import FormActions from "../../../common/components/Form/FormActions/FormActions";
import FormModal from "../../../common/components/Form/FormModal/FormModal";

import { useDirtyForm } from "../../../common/hooks/useDirtyForm";
import { useFormValidation } from "../../../common/hooks/useFormValidation";

import { useLearning } from "../../../store/hooks/useLearning";

import type { Flashcard } from "../../../common/types/learning";

import styles from "./FlashcardCreationModal.module.css";

interface FlashcardCreationModalProps {
  flashcard?: Flashcard | null;
  isOpen: boolean;
  shouldResetForm: boolean;
  pathId: string;
  onClose: () => void;
  onCloseAttempt: () => void;
  onDirtyChange: (dirty: boolean) => void;
}

const FlashcardCreationModal = ({
  flashcard,
  isOpen,
  shouldResetForm,
  pathId,
  onClose,
  onCloseAttempt,
  onDirtyChange,
}: FlashcardCreationModalProps) => {
  const { createLearningFlashcard, updateLearningFlashcard } = useLearning();
  const [loading, setLoading] = useState(false);

  const initialValues = useMemo(
    () => ({
      question: flashcard?.front ?? "",
      answer: flashcard?.back ?? "",
    }),
    [flashcard],
  );

  const { values, setValues, isDirty } = useDirtyForm({
    isOpen,
    shouldResetForm,
    initialValues,
    onDirtyChange,
  });

  const validator = (v: typeof values) => {
    const errors: Partial<Record<keyof typeof values, string>> = {};

    if (!v.question.trim()) errors.question = "Pytanie jest wymagane";
    if (!v.answer.trim()) errors.answer = "Odpowiedź jest wymagana";

    return errors;
  };

  const { errors, validate, clearError } = useFormValidation(values, validator);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    if (flashcard) {
      await updateLearningFlashcard(flashcard.id, {
        front: values.question,
        back: values.answer,
      });
    } else {
      await createLearningFlashcard(pathId, {
        front: values.question,
        back: values.answer,
      });
    }

    setLoading(false);
    onClose();
  };

  return (
    <FormModal
      title={flashcard ? "Edytuj fiszkę" : "Dodaj fiszkę"}
      onSubmit={handleSubmit}
    >
      <Field label="Pytanie *">
        <input
          id="question"
          className={styles.input}
          value={values.question}
          onChange={(e) => {
            clearError("question");
            setValues((v) => ({ ...v, question: e.target.value }));
          }}
        />
        <ErrorText message={errors.question} />
      </Field>
      <Field label="Odpowiedź *">
        <textarea
          id="answer"
          className={styles.textarea}
          rows={4}
          value={values.answer}
          onChange={(e) => {
            clearError("answer");
            setValues((v) => ({ ...v, answer: e.target.value }));
          }}
        />
        <ErrorText message={errors.answer} />
      </Field>
      <FormActions
        loading={loading}
        submitLabel={flashcard ? "Zapisz zmiany" : "Dodaj"}
        onCancel={() => (isDirty ? onCloseAttempt() : onClose())}
      />
    </FormModal>
  );
};

export default FlashcardCreationModal;
