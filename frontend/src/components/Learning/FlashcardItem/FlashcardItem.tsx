import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import type { Flashcard } from "../../../common/types/learning";
import styles from "./FlashcardItem.module.css";

type Mode = "preview" | "study";

interface FlashcardItemProps {
  flashcard: Flashcard;
  mode?: Mode;
  flipped?: boolean;
  onFlip?: () => void;
  onAnswer?: (known: boolean) => void;
  onNext?: () => void;
}

const FlashcardItem = ({
  flashcard,
  mode = "preview",
  flipped: controlledFlipped,
  onFlip,
  onAnswer,
  onNext,
}: FlashcardItemProps) => {
  const isStudy = mode === "study";

  const [localFlipped, setLocalFlipped] = useState(false);

  const flipped = isStudy ? (controlledFlipped ?? false) : localFlipped;
  const setFlipped = isStudy ? onFlip : setLocalFlipped;

  useEffect(() => {
    if (!isStudy) {
      setLocalFlipped(false);
    }
  }, [flashcard.id, isStudy]);

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.card}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* FRONT */}
        <div className={`${styles.face} ${styles.front}`}>
          <p className={styles.text}>{flashcard.front}</p>

          {mode === "preview" && (
            <button
              className={styles.primary}
              onClick={() => setFlipped?.(true)}
            >
              Zobacz odpowiedź
            </button>
          )}

          {mode === "study" && (
            <div className={styles.actions}>
              <button
                onClick={() => {
                  onAnswer?.(true);
                  setFlipped?.(true);
                }}
              >
                Znam
              </button>
              <button
                onClick={() => {
                  onAnswer?.(false);
                  setFlipped?.(true);
                }}
              >
                Nie znam
              </button>
            </div>
          )}
        </div>

        {/* BACK */}
        <div className={`${styles.face} ${styles.back}`}>
          <p className={styles.text}>{flashcard.back}</p>

          {mode === "preview" && (
            <button
              className={styles.secondary}
              onClick={() => setFlipped?.(false)}
            >
              Wróć
            </button>
          )}

          {mode === "study" && <button onClick={onNext}>Dalej</button>}
        </div>
      </motion.div>
    </div>
  );
};

export default FlashcardItem;
