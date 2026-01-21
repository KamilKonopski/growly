import { useState } from "react";
import { motion } from "framer-motion";

import Flashcards from "../Flashcards/Flashcards";
import Modal from "../../../common/components/Modal/Modal";

import { useLearning } from "../../../store/hooks/useLearning";

import type { LearningPath } from "../../../common/types/learning";
import { componentMountVariants } from "../config";

import styles from "./PathCard.module.css";
import EmptyState from "../../../common/components/EmptyState/EmptyState";

interface PathCardProps {
  path: LearningPath;
}

const PathCard = ({ path }: PathCardProps) => {
  const { flashcards } = useLearning(path.id);
  const [showFlashcards, setShowFlashcards] = useState(false);

  const handleOpenFlashcards = () => {
    setShowFlashcards(true);
  };

  const handleCloseFlashcards = () => {
    setShowFlashcards(false);
  };

  const value = 60;
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
          <button>Nauka</button>
        </div>

        <button>Dodaj fiszkę</button>
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
    </>
  );
};

export default PathCard;
