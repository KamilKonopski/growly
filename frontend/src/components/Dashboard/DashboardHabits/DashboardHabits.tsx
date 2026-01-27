import DashboardHabitItem from "./DashboardHabitItem/DashboardHabitItem";
import DashboardSection from "../../../common/components/DashboardSection/DashboardSection";

import { useDashboard } from "../../../store/hooks/useDashboard";

import styles from "./DashboardHabits.module.css";

const DashboardHabits = () => {
  const { dashboardHabits } = useDashboard();

  const habits = dashboardHabits.todayHabits;

  const isEmpty = habits.length === 0;
  const isAllDone = dashboardHabits.totalHabits > 0 && habits.length === 0;

  return (
    <DashboardSection
      title="Twoje nawyki"
      isEmpty={isEmpty}
      emptyText={
        isAllDone
          ? "Wszystkie nawyki na dziś wykonane!"
          : "Nie masz jeszcze żadnych nawyków."
      }
      actionLabel={
        isEmpty && !isAllDone
          ? "Dodaj pierwszy nawyk"
          : "Zobacz wszystkie nawyki"
      }
      actionTo="/habits"
    >
      <ul className={styles.list}>
        {habits.map((habit) => (
          <DashboardHabitItem key={habit.id} habit={habit} />
        ))}
      </ul>
    </DashboardSection>
  );
};

export default DashboardHabits;
