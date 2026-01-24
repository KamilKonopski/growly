import { getHabits } from "./habitService";
import { getHabitsStatusForDate } from "./habitStatusService";

import { DashboardHabits, DashboardHabitsDTO } from "../types/Dashboard";

// get all uncompleted habits
export const getTodayDashboardHabits = (
  userId: string,
  date: string,
): DashboardHabits[] => {
  const habits = getHabits(userId);
  const statuses = getHabitsStatusForDate(userId, date);

  return statuses
    .filter((s) => !s.isCompleted)
    .flatMap((s) => {
      const habit = habits.find((h) => h.id === s.habitId);

      if (!habit) return [];

      return [
        {
          id: habit.id,
          name: habit.name,
          date,
        },
      ];
    });
};

// get today habits
export const getHabitsToday = (
  userId: string,
  date: string,
): DashboardHabitsDTO => {
  const allHabits = getHabits(userId);
  const todayHabits = getTodayDashboardHabits(userId, date);

  return {
    totalHabits: allHabits.length,
    todayHabits,
  };
};
