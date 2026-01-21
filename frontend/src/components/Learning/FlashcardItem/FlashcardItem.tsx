import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Flashcard } from "../../../common/types/learning";
import styles from "./FlashcardItem.module.css";

interface Props {
  flashcard: Flashcard;
}

const FlashcardItem = ({ flashcard }: Props) => {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(false);
  }, [flashcard.id]);

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
          <button className={styles.primary} onClick={() => setFlipped(true)}>
            Zobacz odpowiedź
          </button>
        </div>

        {/* BACK */}
        <div className={`${styles.face} ${styles.back}`}>
          <p className={styles.text}>{flashcard.back}</p>
          <button
            className={styles.secondary}
            onClick={() => setFlipped(false)}
          >
            Wróć
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default FlashcardItem;
