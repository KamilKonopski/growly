import EntityList from "../../../common/components/EntityList/EntityList";
import HabitCard from "../HabitCard/HabitCard";

import { useHabits } from "../../../store/hooks/useHabits";

import type { Habit } from "../../../common/types/habit";

import styles from "./HabitList.module.css";

interface HabitListProps {
  onEdit: (habit: Habit) => void;
}

const HabitList = ({ onEdit }: HabitListProps) => {
  const { habits, logs, isLoading } = useHabits();

  return (
    <EntityList
      items={habits}
      isLoading={isLoading}
      emptyText="Nie masz żadnych nawyków. Dodaj pierwszy nawyk."
      loadingLabel="Ładowanie nawyków..."
      containerClassName={styles.container}
      renderItem={(habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          logs={logs}
          onEdit={() => onEdit(habit)}
        />
      )}
    />
  );
};

export default HabitList;
