import { HabitStatus } from "../types/Habit";
import { diffInDays, getStartOfWeek } from "../utils/dateUtils";
import { getHabitLogs } from "./habitLogsService";
import { getHabits } from "./habitService";

export const getHabitsStatusForDate = (
  userId: string,
  date: string
): HabitStatus[] => {
  const habits = getHabits(userId);
  const logs = getHabitLogs(userId);

  return habits.map((habit) => {
    const habitLogs = logs
      .filter((l) => l.habitId === habit.id)
      .sort((a, b) => b.date.localeCompare(a.date));

    const lastLog = habitLogs[0];
    let isCompleted = false;

    switch (habit.frequency) {
      case "daily":
        isCompleted = lastLog?.date === date;
        break;

      case "weekly": {
        const startOfWeek = getStartOfWeek(date);
        isCompleted = habitLogs.some(
          (log) => log.date >= startOfWeek && log.date <= date
        );
        break;
      }

      case "every_x_days":
        if (!lastLog || !habit.intervalDays) break;
        isCompleted = diffInDays(lastLog.date, date) < habit.intervalDays;
        break;
    }

    return { habitId: habit.id, isCompleted };
  });
};
