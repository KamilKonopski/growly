import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import FlashcardItem from "../FlashcardItem/FlashcardItem";

import styles from "./Flashcards.module.css";
import type { Flashcard } from "../../../common/types/learning";

interface FlashcardsProps {
  flashcards: Flashcard[];
}

const Flashcards = ({ flashcards }: FlashcardsProps) => {
  const [index, setIndex] = useState(0);

  if (!flashcards.length) return null;

  return (
    <div className={styles.scene}>
      {index > 0 && (
        <button
          className={`${styles.arrow} ${styles.left}`}
          onClick={() => setIndex((i) => i - 1)}
        >
          <ChevronLeft size={32} />
        </button>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={flashcards[index].id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <FlashcardItem flashcard={flashcards[index]} />
        </motion.div>
      </AnimatePresence>

      {index < flashcards.length - 1 && (
        <button
          className={`${styles.arrow} ${styles.right}`}
          onClick={() => setIndex((i) => i + 1)}
        >
          <ChevronRight size={32} />
        </button>
      )}
    </div>
  );
};

export default Flashcards;
