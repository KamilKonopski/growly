import type { Dispatch, SetStateAction } from "react";
import type { Habit } from "../../../../common/types/habit";
import styles from "./HabitCalendarFilters.module.css";

interface HabitCalendarFiltersProps {
  habits: Habit[];
  habitId: string | null;
  filter: "all" | "done";
  onHabitChange: Dispatch<SetStateAction<string | null>>;
  onFilterChange: Dispatch<SetStateAction<"all" | "done">>;
}

const HabitCalendarFilters = ({
  habits,
  habitId,
  onHabitChange,
}: HabitCalendarFiltersProps) => {
  return (
    <div className={styles.filters}>
      <select
        value={habitId ?? ""}
        onChange={(e) => onHabitChange(e.target.value)}
        className={styles.select}
      >
        <option value="">Wszystkie (Nawyki)</option>
        {habits.map((h) => (
          <option key={h.id} value={h.id}>
            {h.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default HabitCalendarFilters;
