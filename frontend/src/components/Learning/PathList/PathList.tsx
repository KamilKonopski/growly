import EmptyState from "../../../common/components/EmptyState/EmptyState";
import { Spinner } from "../../../common/components/Spinner/Spinner";
import PathCard from "../PathCard/PathCard";

import { useLearning } from "../../../store/hooks/useLearning";

import { componentMountVariants } from "../config";

import styles from "./PathList.module.css";

const PathList = () => {
  const { paths, isLoading } = useLearning();

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spinner label="ładowanie ścieżek nauki..." />
      </div>
    );
  }

  if (!paths.length) {
    return (
      <EmptyState animationVariant={componentMountVariants}>
        <p>Nie masz żadnych ścieżek. Dodaj pierwszą ścieżkę</p>
      </EmptyState>
    );
  }

  return (
    <div className={styles.container}>
      {paths.map((path) => (
        <PathCard key={path.id} path={path} />
      ))}
    </div>
  );
};

export default PathList;
