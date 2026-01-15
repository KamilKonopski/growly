import { HabitLog } from "../types/Habit";
import { readHabitLogs, writeHabitLogs } from "../utils/fileStorage";

// Get all habit logs
export const getHabitLogs = (
  userId: string,
  habitId?: string,
  lastDays?: number
): HabitLog[] => {
  let habitLogs = readHabitLogs().filter((l) => l.userId === userId);

  if (habitId) {
    habitLogs = habitLogs.filter((l) => l.habitId === habitId);
  }

  if (lastDays) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - lastDays);

    habitLogs = habitLogs.filter((l) => new Date(l.date) >= cutoff);
  }

  return habitLogs;
};

// Get habit log by ID
export const getHabitLogById = (
  userId: string,
  logId: string
): HabitLog | null => {
  const habitLogs = getHabitLogs(userId);
  return habitLogs.find((l) => l.id === logId) || null;
};

// Create new habit log
export const createHabitLog = (
  userId: string,
  habitId: string,
  date: string
): HabitLog => {
  const habitLogs = readHabitLogs();

  const newHabitLog = {
    id: Date.now().toString(),
    userId,
    habitId,
    date,
  };

  habitLogs.push(newHabitLog);
  writeHabitLogs(habitLogs);

  return newHabitLog;
};

// Update existing habit log
export const updateHabitLog = (
  userId: string,
  logId: string,
  updatedData: Partial<Omit<HabitLog, "id" | "userId">>
): HabitLog | null => {
  const habitLogs = readHabitLogs();
  const habitLogIndex = habitLogs.findIndex(
    (l) => l.userId === userId && l.id === logId
  );

  if (habitLogIndex === -1) return null;

  habitLogs[habitLogIndex] = {
    ...habitLogs[habitLogIndex],
    ...updatedData,
  };

  writeHabitLogs(habitLogs);

  return habitLogs[habitLogIndex];
};

// Delete existing habit log
export const deleteHabitLog = (userId: string, logId: string): boolean => {
  const habitLogs = readHabitLogs();
  const filteredHabitLogs = habitLogs.filter(
    (l) => !(l.userId === userId && l.id === logId)
  );

  if (filteredHabitLogs.length === habitLogs.length) return false;

  writeHabitLogs(filteredHabitLogs);

  return true;
};

// Logs in a given date range
export const getHabitLogsByDateRange = (
  userId: string,
  startDate: string,
  endDate: string
): HabitLog[] => {
  return getHabitLogs(userId).filter(
    (log) => log.date >= startDate && log.date <= endDate
  );
};

// Summary of the making of habits
export const getHabitCompletionStats = (
  userId: string,
  habitId: string,
  lastDays?: number
): { completed: number; total: number } => {
  const habitLogs = getHabitLogs(userId).filter((l) => l.habitId === habitId);
  const completedHabits = habitLogs.length;

  return {
    completed: completedHabits,
    total: habitLogs.length,
  };
};
