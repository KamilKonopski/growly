import { motion } from "framer-motion";

import type { LearningPath } from "../../../common/types/learning";
import { componentMountVariants } from "../config";

import styles from "./PathCard.module.css";

interface PathCardProps {
  path: LearningPath;
}

const PathCard = ({ path }: PathCardProps) => {
  const value = 60;
  return (
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

      <div>
        <p>Progres nauki:</p>
        <div className={styles.bar}>
          <div className={styles.progress} style={{ width: `${value}%` }} />
        </div>
        <span>{value}%</span>
      </div>

      <p className={styles.flashcard}>0 fiszek</p>

      <button>Otwórz</button>
      <button>Nauka</button>
    </motion.article>
  );
};

export default PathCard;
