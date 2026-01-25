import { useState } from "react";

import type { DashboardHabit } from "../../../../common/types/dashboard";

import { useHabits } from "../../../../store/hooks/useHabits";

import styles from "./DashboardHabitItem.module.css";

interface DashboardHabitItemProps {
  habit: DashboardHabit;
}

const DashboardHabitItem = ({ habit }: DashboardHabitItemProps) => {
  const { createHabitLog } = useHabits();
  const [loading, setLoading] = useState(false);
  const [removing, setRemoving] = useState(false);

  const todayStr = new Date().toISOString().slice(0, 10);

  const handleCheckIn = async () => {
    if (loading) return;

    setLoading(true);

    setRemoving(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      await createHabitLog({
        habitId: habit.id,
        date: todayStr,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <li className={`${styles.item} ${removing ? styles.removing : ""}`}>
      <p className={styles.name}>{habit.name}</p>
      <p className={styles.date}>
        {new Date(habit.date).toLocaleDateString("pl-PL")}
      </p>
      <button className={styles.btn} onClick={handleCheckIn} disabled={loading}>
        {loading ? "Zapisywanie..." : "Oznacz jako wykonane"}
      </button>
    </li>
  );
};

export default DashboardHabitItem;
