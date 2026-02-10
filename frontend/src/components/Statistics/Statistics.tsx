import HabitLineChart from "./HabitsLineChart/HabitsLineChart";
import LearningBarChart from "./LearningBarChart/LearningBarChart";
import StatsOverview from "./StatsOverview/StatsOverview";
import StatsSummary from "./StatsSummary/StatsSummary";

import styles from "./Statistics.module.css";

const Statistics = () => {
  return (
    <section className={styles.container}>
      <StatsOverview />
      <HabitLineChart />
      <LearningBarChart />
      <StatsSummary />
    </section>
  );
};

export default Statistics;
