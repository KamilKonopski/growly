import BaseCard from "../../../common/components/BaseCard/BaseCard";

import { useStats } from "../../../store/hooks/useStats";

import styles from "./StatsOverview.module.css";

const StatsOverview = () => {
  const { habitStats, learningStats, isLoading } = useStats();

  if (isLoading || !habitStats || !learningStats) return null;

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
    <div className={styles.grid}>
      <BaseCard>
        <p className={styles.label}>Wszystkie nawyki</p>
        <p className={styles.value}>{habitStats.totalHabits}</p>
      </BaseCard>
      <BaseCard>
        <p className={styles.label}>Ukończone</p>
        <p className={styles.value}>{habitStats.completionRate}%</p>
      </BaseCard>
      <BaseCard>
        <p className={styles.label}>Nauka</p>
        <p className={styles.value}>{avgLearning}%</p>
      </BaseCard>
      <BaseCard>
        <p className={styles.label}>Streak</p>
        <p className={styles.value}>---</p>
      </BaseCard>
    </div>
  );
};

export default StatsOverview;
