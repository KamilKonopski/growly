import DashboardLearningPathItem from "./DashboardLearningPathItem/DashboardLearningPathItem";
import DashboardSection from "../../../common/components/DashboardSection/DashboardSection";

import { useDashboard } from "../../../store/hooks/useDashboard";

import styles from "./DashboardLearningPaths.module.css";

const DashboardLearningPaths = () => {
  const { dashboardLearningPaths: learningPaths } = useDashboard();

  const isEmpty = learningPaths.length === 0;

  return (
    <DashboardSection
      title="Twoje najnowsze ścieżki"
      isEmpty={isEmpty}
      emptyText="Nie masz jeszcze żadnych ścieżek."
      actionLabel={
        isEmpty ? "Dodaj pierwszą ścieżkę" : "Zobacz wszystkie ścieżki"
      }
      actionTo="/learning"
    >
      <ul className={styles.list}>
        {learningPaths.map((path) => (
          <DashboardLearningPathItem key={path.id} path={path} />
        ))}
      </ul>
    </DashboardSection>
  );
};

export default DashboardLearningPaths;
