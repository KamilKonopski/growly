import type { DashboardLearningPath } from "../../../../common/types/dashboard";

import styles from "./DashboardLearningPathItem.module.css";

interface DashboardLearningPathItemProps {
  path: DashboardLearningPath;
}

const DashboardLearningPathItem = ({
  path,
}: DashboardLearningPathItemProps) => {
  return (
    <li className={styles.item}>
      <p className={styles.name}>{path.name}</p>
      <p className={styles.flashcards}>
        Fiszki: {path.knownFlashcards} / {path.totalFlashcards}
      </p>
    </li>
  );
};

export default DashboardLearningPathItem;
