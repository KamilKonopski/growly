import { Link } from "react-router-dom";

import EmptyState from "../../../common/components/EmptyState/EmptyState";
import DashboardLearningPathItem from "./DashboardLearningPathItem/DashboardLearningPathItem";

import { useDashboard } from "../../../store/hooks/useDashboard";

import styles from "./DashboardLearningPaths.module.css";

const DashboardLearningPaths = () => {
  const { dashboardLearningPaths: learningPaths } = useDashboard();

  const isEmpty = learningPaths.length === 0;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Twoje najnowsze ścieżki</h3>
      </div>

      {isEmpty ? (
        <EmptyState>
          <p>Nie masz jeszcze żadnych ścieżek.</p>
        </EmptyState>
      ) : (
        <ul className={styles.list}>
          {learningPaths.map((path) => (
            <DashboardLearningPathItem key={path.id} path={path} />
          ))}
        </ul>
      )}

      <div className={styles.actions}>
        <Link className={styles.button} to="/learning">
          {isEmpty ? "Dodaj pierwszą ścieżkę" : "Zobacz wszystkie ścieżki"}
        </Link>
      </div>
    </div>
  );
};

export default DashboardLearningPaths;
