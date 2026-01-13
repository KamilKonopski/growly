import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { useHabits } from "../../../store/hooks/useHabits";

import type { Habit, HabitLog } from "../../../common/types/habit";

import styles from "./HabitCard.module.css";
import { componentMountVariants } from "../config";

interface HabitCardProps {
  habit: Habit;
  logs?: HabitLog[];
  onEdit?: () => void;
}

const HabitCard = ({ habit, logs = [], onEdit }: HabitCardProps) => {
  const { createHabitLog, deleteHabitLog, habitStatus } = useHabits();
  const [loading, setLoading] = useState(false);

  const todayStr = new Date().toISOString().slice(0, 10);

  const status = habitStatus.find((s) => s.habitId === habit.id);
  const completed = status?.isCompleted ?? false;

  const todayLog = logs.find(
    (log) => log.habitId === habit.id && log.date === todayStr
  );

  const handleCheckIn = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (completed && todayLog) {
        await deleteHabitLog(todayLog.id);
      } else if (!completed) {
        await createHabitLog({
          habitId: habit.id,
          date: todayStr,
          completed: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const frequencyLabel =
    habit.frequency === "daily"
      ? "Codziennie"
      : habit.frequency === "weekly"
      ? "Co tydzień"
      : `Co ${habit.intervalDays} dni`;

  const completedLogs = logs.filter(
    (log) => log.habitId === habit.id && log.completed
  ).length;

  return (
    <motion.article
      className={styles.card}
      variants={componentMountVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        y: -8,
        borderColor: "var(--color-primary)",
        transition: { duration: 0.2, ease: "easeOut" },
      }}
    >
      <h3 className={styles.name}>{habit.name}</h3>

      <p className={styles.created}>
        Utworzono: {new Date(habit.createdAt).toLocaleDateString()}
      </p>

      <p className={styles.frequency}>Częstotliwość: {frequencyLabel}</p>

      <p
        className={completedLogs > 0 ? styles.progress : styles["not-progress"]}
      >
        Wykonano: {completedLogs} {completedLogs === 1 ? "raz" : "razy"}
      </p>

      <div className={styles.button_container}>
        <button
          onClick={handleCheckIn}
          disabled={loading}
          className={`${styles.checkin_btn} ${
            completed ? styles.completed : ""
          }`}
        >
          {completed ? (
            <>
              <Check size={16} className={styles.icon} />
              Zrobione
            </>
          ) : (
            "Oznacz jako wykonane"
          )}
        </button>

        <button className={styles.edit_btn} onClick={onEdit}>
          Edytuj nawyk
        </button>
      </div>
    </motion.article>
  );
};

export default HabitCard;
