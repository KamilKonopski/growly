import { useEffect, useMemo, useState } from "react";

import { useLearning } from "../../../store/hooks/useLearning";
import type {
  CreateLearningPathRequest,
  UpdateLearningPathRequest,
  LearningPath,
} from "../../../store/learning/learningApi.types";

import styles from "./PathCreationModal.module.css";

interface PathCreationModalProps {
  onClose: () => void;
  onCloseAttempt: () => void;
  onDirtyChange: (dirty: boolean) => void;
  path?: LearningPath | null;
  isOpen: boolean;
  shouldResetForm: boolean;
}

const PathCreationModal = ({
  onClose,
  onCloseAttempt,
  onDirtyChange,
  path,
  isOpen,
  shouldResetForm,
}: PathCreationModalProps) => {
  const { createLearningPath, updateLearningPath } = useLearning();

  const [name, setName] = useState(path?.name ?? "");
  const [description, setDescription] = useState(path?.description ?? "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !shouldResetForm) return;

    if (path) {
      setName(path.name);
      setDescription(path.description ?? "");
    } else {
      setName("");
      setDescription("");
    }

    onDirtyChange(false);
  }, [isOpen, shouldResetForm, path, onDirtyChange]);

  const initialValues = useMemo(
    () => ({
      name: path?.name ?? "",
      description: path?.description ?? "",
    }),
    [path],
  );

  const isDirty =
    name !== initialValues.name || description !== initialValues.description;

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

    if (path) {
      const payload: UpdateLearningPathRequest = {
        name,
        description: description || undefined,
      };
      await updateLearningPath(path.id, payload);
    } else {
      const payload: CreateLearningPathRequest = {
        name,
        description: description || undefined,
      };
      await createLearningPath(payload);
    }

    setLoading(false);
    onClose();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {path ? "Edytuj ścieżkę nauki" : "Dodaj nową ścieżkę"}
      </h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Nazwa ścieżki
          <input
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Np. Frontend Developer"
            required
          />
        </label>

        <label className={styles.label}>
          Opis (opcjonalnie)
          <textarea
            className={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Czego dotyczy ta ścieżka?"
            rows={4}
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
            {loading ? "Zapisywanie..." : path ? "Zapisz zmiany" : "Dodaj"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PathCreationModal;
