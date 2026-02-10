import BaseCard from "../../../common/components/BaseCard/BaseCard";

import { useStats } from "../../../store/hooks/useStats";

import styles from "./StatsSummary.module.css";

const StatsSummary = () => {
  const { habitStats, learningStats } = useStats();

  if (!habitStats || !learningStats) return null;

  const avgLearning =
    learningStats.progressPerPath.length === 0
      ? 0
      : Math.round(
          learningStats.progressPerPath.reduce(
            (sum, p) => sum + p.progress,
            0,
          ) / learningStats.progressPerPath.length,
        );

  return (
    <BaseCard>
      {habitStats.completionRate > 70 && (
        <p className={styles.text}>
          Dobra robota - wysoka skuteczność nawyków!
        </p>
      )}
      {avgLearning > habitStats.completionRate && (
        <p className={styles.text}>
          Nauka idzie lepiej niż nawyki - może warto je wzmocnić?
        </p>
      )}
      {habitStats.completionRate <= 70 &&
        avgLearning <= habitStats.completionRate && (
          <p className={styles.text}>Kontynuuj regularną pracę</p>
        )}
    </BaseCard>
  );
};

export default StatsSummary;
