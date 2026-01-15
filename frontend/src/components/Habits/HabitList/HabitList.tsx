import EmptyState from "../../../common/components/EmptyState/EmptyState";
import HabitCard from "../HabitCard/HabitCard";
import { Spinner } from "../../../common/components/Spinner/Spinner";

import { useHabits } from "../../../store/hooks/useHabits";

import type { Habit } from "../../../common/types/habit";
import { componentMountVariants } from "../config";

import styles from "./HabitList.module.css";

interface HabitListProps {
  onEdit: (habit: Habit) => void;
}

const HabitList = ({ onEdit }: HabitListProps) => {
  const { habits, logs, isLoading } = useHabits();

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spinner label="Ładowanie nawyków..." />
      </div>
    );
  }

  if (!habits.length) {
    return (
      <EmptyState animationVariant={componentMountVariants}>
        <p>Nie masz żadnych nawyków. Dodaj pierwszy nawyk.</p>
      </EmptyState>
    );
  }

  return (
    <div className={styles.container}>
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          logs={logs}
          onEdit={() => onEdit(habit)}
        />
      ))}
    </div>
  );
};

export default HabitList;
