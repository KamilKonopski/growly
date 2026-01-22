import { useEffect, useMemo, useState } from "react";

import { useLearning } from "../../../store/hooks/useLearning";
import type {
  CreateFlashcardRequest,
  UpdateFlashcardRequest,
} from "../../../store/learning/learningApi.types";

import type { Flashcard } from "../../../common/types/learning";

import styles from "./FlashcardCreationModal.module.css";

interface FlashcardCreationModalProps {
  onClose: () => void;
  onCloseAttempt: () => void;
  onDirtyChange: (dirty: boolean) => void;
  flashcard?: Flashcard | null;
  isOpen: boolean;
  shouldResetForm: boolean;
  pathId: string;
}

const FlashcardCreationModal = ({
  onClose,
  onCloseAttempt,
  onDirtyChange,
  flashcard,
  isOpen,
  shouldResetForm,
  pathId,
}: FlashcardCreationModalProps) => {
  const { createLearningFlashcard, updateLearningFlashcard } = useLearning();

  const [question, setQuestion] = useState(flashcard?.front ?? "");
  const [answer, setAnswer] = useState(flashcard?.back ?? "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !shouldResetForm) return;

    if (flashcard) {
      setQuestion(flashcard.front);
      setAnswer(flashcard.back ?? "");
    } else {
      setQuestion("");
      setAnswer("");
    }

    onDirtyChange(false);
  }, [isOpen, shouldResetForm, flashcard, onDirtyChange]);

  const initialValues = useMemo(
    () => ({
      question: flashcard?.front ?? "",
      answer: flashcard?.back ?? "",
    }),
    [flashcard],
  );

  const isDirty =
    question !== initialValues.question || answer !== initialValues.answer;

  useEffect(() => {
    onDirtyChange(isDirty);
  }, [isDirty, onDirtyChange]);

  const handleCloseAttemptInternal = () => {
    if (!isDirty) onClose();
    else onCloseAttempt();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (flashcard) {
      const payload: UpdateFlashcardRequest = {
        front: question,
        back: answer,
      };
      await updateLearningFlashcard(flashcard.id, payload);
    } else {
      const payload: CreateFlashcardRequest = {
        front: question,
        back: answer,
      };
      await createLearningFlashcard(pathId, payload);
    }

    setLoading(false);
    onClose();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {flashcard ? "Edytuj fiszkę" : "Dodaj nową fiszkę"}
      </h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Pytanie *
          <input
            className={styles.input}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Jakie jest pytanie?"
            required
          />
        </label>

        <label className={styles.label}>
          Odpowiedź *
          <textarea
            className={styles.textarea}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Jaka jest odpowiedź?"
            rows={4}
            required
          />
        </label>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancel}
            onClick={handleCloseAttemptInternal}
          >
            Anuluj
          </button>
          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? "Zapisywanie..." : flashcard ? "Zapisz zmiany" : "Dodaj"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FlashcardCreationModal;
