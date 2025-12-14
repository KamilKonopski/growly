import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import type { Habit, HabitLog } from "../../../../common/types/habit";
import {
  formatDate,
  getWeekDays,
  isHabitDoneForDay,
  isToday,
} from "../../../../common/utils/calendarLogic";
import styles from "./HabitCalendarWeek.module.css";
import { WEEK_DAYS } from "../../config";

interface HabitCalendarWeekProps {
  week: Date;
  habits: Habit[];
  habitId: string | null;
  logs: HabitLog[];
  filter: "all" | "done";
  onPrev: () => void;
  onNext: () => void;
}

const HabitCalendarWeek = ({
  week,
  habits,
  habitId,
  logs,
  filter,
  onPrev,
  onNext,
}: HabitCalendarWeekProps) => {
  const days = getWeekDays(week);
  const visibleHabits = habitId
    ? habits.filter((h) => h.id === habitId)
    : habits;

  const monthYear = week.toLocaleDateString("pl-PL", {
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <div className={styles.nav}>
        <button onClick={onPrev}>
          <ArrowBigLeft />
        </button>
        <span>{monthYear}</span>
        <button onClick={onNext}>
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
        {days.map((day) => {
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
    </>
  );
};

export default HabitCalendarWeek;
