import { Link } from "react-router-dom";

import EmptyState from "../../../common/components/EmptyState/EmptyState";
import DashboardHabitItem from "./DashboardHabitItem/DashboardHabitItem";

import { useDashboard } from "../../../store/hooks/useDashboard";

import styles from "./DashboardHabits.module.css";

const DashboardHabits = () => {
  const { dashboardHabits } = useDashboard();

  const habits = dashboardHabits.todayHabits;

  const isEmpty = habits.length === 0;
  const isAllDone = dashboardHabits.totalHabits > 0 && habits.length === 0;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Twoje nawyki</h3>
      </div>

      {isEmpty ? (
        <EmptyState>
          {isAllDone ? (
            <p>Wszystkie nawyki na dziś wykonane!</p>
          ) : (
            <p>Nie masz jeszcze żadnych nawyków.</p>
          )}
        </EmptyState>
      ) : (
        <ul className={styles.list}>
          {habits.map((habit) => (
            <DashboardHabitItem key={habit.id} habit={habit} />
          ))}
        </ul>
      )}

      <div className={styles.actions}>
        <Link className={styles.button} to="/habits">
          {isEmpty && !isAllDone
            ? "Dodaj pierwszy nawyk"
            : "Zobacz wszystkie nawyki"}
        </Link>
      </div>
    </div>
  );
};

export default DashboardHabits;
