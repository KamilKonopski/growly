import type { Habit, HabitLog } from "../types/habit";

export const mapLogsPerHabit = (
  habits: Habit[],
  logs: HabitLog[],
  days?: number
) => {
  const endDate = new Date().toISOString().slice(0, 10);
  const startDate = days
    ? new Date(Date.now() - (days - 1) * 86400000).toISOString().slice(0, 10)
    : null;

  const filteredLogs = startDate
    ? logs.filter((log) => log.date >= startDate && log.date <= endDate)
    : logs;

  const map = new Map<string, number>();
  filteredLogs.forEach((log) =>
    map.set(log.habitId, (map.get(log.habitId) ?? 0) + 1)
  );

  return habits.map((habit) => ({
    name: habit.name,
    value: map.get(habit.id) ?? 0,
  }));
};

export const mapLogsToTrend = (logs: HabitLog[], days: number) => {
  const map = new Map<string, number>();
  logs.forEach((log) => map.set(log.date, (map.get(log.date) ?? 0) + 1));

  return Array.from({ length: days }, (_, i) => {
    const date = new Date(Date.now() - (days - 1 - i) * 86400000)
      .toISOString()
      .slice(0, 10);
    return { date, value: map.get(date) ?? 0 };
  });
};
