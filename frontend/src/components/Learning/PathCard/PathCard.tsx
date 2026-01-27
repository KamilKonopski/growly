import { useState } from "react";
import { motion } from "framer-motion";

import ConfirmLeavingModal from "../../HabitCreation/ConfirmLeavingModal/ConfirmLeavingModal";
import EmptyState from "../../../common/components/EmptyState/EmptyState";
import Flashcards from "../Flashcards/Flashcards";
import FlashcardCreationModal from "../FlashcardCreation/FlashcardCreationModal";
import Modal from "../../../common/components/Modal/Modal";
import StudyModal from "../StudyModal/StudyModal";

import { useModalWithDirtyForm } from "../../../common/hooks/useModalWithDirtyForm";

import { useLearning } from "../../../store/hooks/useLearning";

import type { Flashcard, LearningPath } from "../../../common/types/learning";
import { componentMountVariants } from "../config";

import styles from "./PathCard.module.css";

interface PathCardProps {
  path: LearningPath;
}

const PathCard = ({ path }: PathCardProps) => {
  const { flashcards } = useLearning(path.id);
  const modal = useModalWithDirtyForm();

  const [showFlashcards, setShowFlashcards] = useState(false);
  const [studyOpen, setStudyOpen] = useState(false);
  const [editingFlashcard, setEditingFlashcard] = useState<Flashcard | null>(
    null,
  );
  const known = flashcards.filter((f) => f.known).length;
  const progress = flashcards.length
    ? Math.round((known / flashcards.length) * 100)
    : 0;

  const openAddFlashcard = () => {
    setEditingFlashcard(null);
    modal.openModal();
  };

  return (
    <>
      <motion.article
        className={styles.card}
        variants={componentMountVariants}
        initial="hidden"
        animate="visible"
        whileHover={{
          y: -8,
          borderColor: "var(--color-primary)",
          transition: { duration: 0.2, ease: "easeOut" },
        }}
      >
        <h3 className={styles.name}>Tytuł: {path.name}</h3>
        {path.description && <p>Opis: {path.description}</p>}
        <div className={styles["progress-bar"]}>
          <p>Progres nauki:</p>
          <div className={styles.bar}>
            <div
              className={styles.progress}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className={styles["progress-value"]}>{progress}%</span>
        </div>
        <p className={styles.flashcard}>
          {flashcards.length} {flashcards.length === 1 ? "fiszka" : "fiszek"}
        </p>
        <div>
          <button onClick={() => setShowFlashcards(true)}>Otwórz</button>
          <button onClick={() => setStudyOpen(true)}>Nauka</button>
        </div>
        <button onClick={openAddFlashcard}>Dodaj fiszkę</button>
      </motion.article>
      <Modal
        isOpen={showFlashcards}
        onClose={() => setShowFlashcards(false)}
        maxWidth={700}
      >
        {flashcards.length > 0 ? (
          <Flashcards flashcards={flashcards} />
        ) : (
          <EmptyState>
            <p>Nie masz żadnych fiszek. Dodaj pierwszą fiszkę.</p>
          </EmptyState>
        )}
      </Modal>
      <Modal
        isOpen={studyOpen}
        onClose={() => setStudyOpen(false)}
        maxWidth={700}
      >
        <StudyModal pathId={path.id} onClose={() => setStudyOpen(false)} />
      </Modal>
      <Modal isOpen={modal.open} keepMounted onClose={modal.attemptClose}>
        <FlashcardCreationModal
          flashcard={editingFlashcard}
          isOpen={modal.open}
          shouldResetForm={modal.shouldResetForm}
          pathId={path.id}
          onClose={modal.forceClose}
          onCloseAttempt={modal.attemptClose}
          onDirtyChange={modal.setIsDirty}
        />
      </Modal>
      <Modal isOpen={modal.showConfirm} onClose={modal.confirmStay}>
        <ConfirmLeavingModal
          onCancel={modal.confirmStay}
          onConfirm={modal.confirmLeave}
        />
      </Modal>
    </>
  );
};

export default PathCard;
