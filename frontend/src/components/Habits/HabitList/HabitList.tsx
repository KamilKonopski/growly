import HabitCard from "../HabitCard/HabitCard";

import { useHabits } from "../../../store/hooks/useHabits";

import type { Habit } from "../../../common/types/habit";

import styles from "./HabitList.module.css";

interface HabitListProps {
  onEdit: (habit: Habit) => void;
}

const HabitList = ({ onEdit }: HabitListProps) => {
  const { habits, logs } = useHabits();

  return habits.length ? (
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
  ) : (
    <p>Nie masz żadnych nawyków. Dodaj pierwszy nawyk.</p>
  );
};

export default HabitList;
