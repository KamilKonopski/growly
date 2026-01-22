import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import ConfirmLeavingModal from "../../HabitCreation/ConfirmLeavingModal/ConfirmLeavingModal";
import EmptyState from "../../../common/components/EmptyState/EmptyState";
import Flashcards from "../Flashcards/Flashcards";
import FlashcardCreationModal from "../FlashcardCreation/FlashcardCreationModal";
import Modal from "../../../common/components/Modal/Modal";
import StudyModal from "../StudyModal/StudyModal";

import { useLearning } from "../../../store/hooks/useLearning";

import type { Flashcard, LearningPath } from "../../../common/types/learning";
import { componentMountVariants } from "../config";

import styles from "./PathCard.module.css";

interface PathCardProps {
  path: LearningPath;
}

const PathCard = ({ path }: PathCardProps) => {
  const { flashcards } = useLearning(path.id);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [studyOpen, setStudyOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [shouldReopen, setShouldReopen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [editingFlashcard, setEditingFlashcard] = useState<Flashcard | null>(
    null,
  );
  const [shouldResetForm, setShouldResetForm] = useState(false);

  const known = flashcards.filter((f) => f.known).length;
  const value = flashcards.length
    ? Math.round((known / flashcards.length) * 100)
    : 0;

  const handleOpenFlashcards = () => {
    setShowFlashcards(true);
  };

  const handleCloseFlashcards = () => {
    setShowFlashcards(false);
  };

  const handleOpenStudyMode = () => {
    setStudyOpen(true);
  };

  const handleCloseStudyMode = () => {
    setStudyOpen(false);
  };

  const handleOpenAddFlashcard = () => {
    setEditingFlashcard(null);
    setShouldResetForm(true);
    setOpenModal(true);
  };

  // const handleEditFlashcard = (flashcard: Flashcard) => {
  //   setEditingFlashcard(flashcard);
  //   setShouldResetForm(true);
  //   setOpenModal(true);
  // };

  const handleForceCloseModal = () => {
    setIsDirty(false);
    setEditingFlashcard(null);
    setShouldResetForm(true);
    setOpenModal(false);
  };

  const handleCloseAttempt = () => {
    if (isDirty) {
      setOpenModal(false);
      setShowConfirm(true);
      setShouldReopen(true);
    } else {
      setOpenModal(false);
    }
  };

  const handleConfirmStay = () => {
    setShowConfirm(false);

    if (shouldReopen) {
      setOpenModal(true);
      setShouldReopen(false);
    }
  };

  const handleConfirmLeave = () => {
    setIsDirty(false);
    setEditingFlashcard(null);
    setShouldResetForm(true);
    setShowConfirm(false);
    setShouldReopen(false);
  };

  useEffect(() => {
    if (openModal) {
      setShouldResetForm(false);
    }
  }, [openModal]);

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
            <div className={styles.progress} style={{ width: `${value}%` }} />
          </div>
          <span className={styles["progress-value"]}>{value}%</span>
        </div>

        <p className={styles.flashcard}>
          {flashcards.length} {flashcards.length === 1 ? "fiszka" : "fiszek"}
        </p>

        <div>
          <button onClick={handleOpenFlashcards}>Otwórz</button>
          <button onClick={handleOpenStudyMode}>Nauka</button>
        </div>

        <button onClick={handleOpenAddFlashcard}>Dodaj fiszkę</button>
      </motion.article>

      <Modal
        isOpen={showFlashcards}
        onClose={handleCloseFlashcards}
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

      <Modal isOpen={studyOpen} onClose={handleCloseStudyMode} maxWidth={700}>
        <StudyModal pathId={path.id} onClose={handleCloseStudyMode} />
      </Modal>

      <Modal isOpen={openModal} keepMounted onClose={handleCloseAttempt}>
        <FlashcardCreationModal
          isOpen={openModal}
          shouldResetForm={shouldResetForm}
          onClose={handleForceCloseModal}
          onCloseAttempt={handleCloseAttempt}
          onDirtyChange={setIsDirty}
          flashcard={editingFlashcard}
          pathId={path.id}
        />
      </Modal>
      <Modal isOpen={showConfirm} onClose={handleConfirmStay}>
        <ConfirmLeavingModal
          onCancel={handleConfirmStay}
          onConfirm={handleConfirmLeave}
        />
      </Modal>
    </>
  );
};

export default PathCard;
