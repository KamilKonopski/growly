import { useState, type Dispatch, type SetStateAction } from "react";
import { ArrowBigLeft, ArrowBigRight, X } from "lucide-react";

import type { Habit, HabitLog } from "../../../../common/types/habit";
import {
  isHabitDoneForDay,
  getMonthDays,
  formatDate,
  isToday,
} from "../../../../common/utils/calendarLogic";

import HabitCalendarFilters from "../HabitCalendarFilters/HabitCalendarFilters";
import Modal from "../../../../common/components/Modal/Modal";

import styles from "./HabitCalendarMonthModal.module.css";
import { WEEK_DAYS } from "../../config";

interface HabitCalendarMonthModalProps {
  isOpen: boolean;
  onClose: () => void;
  habits: Habit[];
  habitId: string | null;
  logs: HabitLog[];
  filter: "all" | "done";
  onHabitChange: Dispatch<SetStateAction<string | null>>;
  onFilterChange: Dispatch<SetStateAction<"all" | "done">>;
}

const HabitCalendarMonthModal = ({
  isOpen,
  onClose,
  habits,
  habitId,
  logs,
  filter,
  onHabitChange,
  onFilterChange,
}: HabitCalendarMonthModalProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const days = getMonthDays(currentDate.getFullYear(), currentDate.getMonth());
  const visibleHabits = habitId
    ? habits.filter((h) => h.id === habitId)
    : habits;

  const monthYear = currentDate.toLocaleDateString("pl-PL", {
    month: "long",
    year: "numeric",
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles["modal_header"]}>
        <HabitCalendarFilters
          habits={habits}
          habitId={habitId}
          filter={filter}
          onHabitChange={onHabitChange}
          onFilterChange={onFilterChange}
        />
        <X cursor={"pointer"} onClick={onClose} />
      </div>

      <div className={styles.nav}>
        <button
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
            )
          }
        >
          <ArrowBigLeft />
        </button>
        <span>{monthYear}</span>
        <button
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
            )
          }
        >
          <ArrowBigRight />
        </button>
      </div>
      <div className={styles.header}>
        {WEEK_DAYS.map((d) => (
          <div key={d} className={styles.header_cell}>
            {d}
          </div>
        ))}
      </div>
      <div className={styles.grid}>
        {days.map((day, idx) => {
          if (!day)
            return <div key={`empty-${idx}`} className={styles.empty} />;

          const results = visibleHabits.map((habit) => ({
            habit,
            done: isHabitDoneForDay(
              day,
              logs.filter((l) => l.habitId === habit.id)
            ),
          }));

          const doneHabits = results.filter((r) => r.done);
          if (doneHabits.length === 0 && filter === "done") return null;

          return (
            <div
              key={formatDate(day)}
              className={`${styles.day} ${isToday(day) ? styles.today : ""}`}
            >
              <span className={styles.date}>{day.getDate()}</span>
              {doneHabits.map((r) => (
                <span
                  key={r.habit.id}
                  className={styles.habit_label_done}
                  title={r.habit.name}
                >
                  {r.habit.name.length > 10
                    ? r.habit.name.slice(0, 10) + "…"
                    : r.habit.name}
                </span>
              ))}
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default HabitCalendarMonthModal;
