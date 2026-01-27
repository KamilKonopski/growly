import EntityList from "../../../common/components/EntityList/EntityList";
import PathCard from "../PathCard/PathCard";

import { useLearning } from "../../../store/hooks/useLearning";

import styles from "./PathList.module.css";

const PathList = () => {
  const { paths, isLoading } = useLearning();

  return (
    <EntityList
      items={paths}
      isLoading={isLoading}
      emptyText="Nie masz żadnych ścieżek. Dodaj pierwszą ścieżką."
      loadingLabel="Ładowanie ścieżek nauki..."
      containerClassName={styles.container}
      renderItem={(path) => <PathCard key={path.id} path={path} />}
    />
  );
};

export default PathList;
