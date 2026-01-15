import { Habit } from "../types/Habit";
import { readHabits, writeHabits } from "../utils/fileStorage";

// Get all habits
export const getHabits = (userId: string): Habit[] => {
  const habits = readHabits();
  return habits.filter((h) => h.userId === userId);
};

// Get habit by ID
export const getHabitById = (userId: string, habitId: string): Habit | null => {
  const habits = getHabits(userId);
  return habits.find((h) => h.id === habitId) || null;
};

// Create new habit
export const createHabit = (
  userId: string,
  habitData: Omit<Habit, "id" | "userId" | "createdAt">
): Habit => {
  const habits = readHabits();

  const newHabit: Habit = {
    id: Date.now().toString(),
    userId,
    createdAt: new Date().toISOString(),
    ...habitData,
  };

  habits.push(newHabit);
  writeHabits(habits);

  return newHabit;
};

// Update existing habit
export const updateHabit = (
  userId: string,
  habitId: string,
  updatedData: Partial<Omit<Habit, "id" | "userId" | "createdAt">>
): Habit | null => {
  const habits = readHabits();
  const habitIndex = habits.findIndex(
    (h) => h.userId === userId && h.id === habitId
  );

  if (habitIndex === -1) return null;

  habits[habitIndex] = {
    ...habits[habitIndex],
    ...updatedData,
  };

  writeHabits(habits);

  return habits[habitIndex];
};

// Delete existing habit
export const deleteHabit = (userId: string, habitId: string): boolean => {
  const habits = readHabits();
  const filteredHabits = habits.filter(
    (h) => !(h.userId === userId && h.id === habitId)
  );

  if (filteredHabits.length === habits.length) return false;

  writeHabits(filteredHabits);

  return true;
};

// Summary for example last X days
export const getHabitsSummary = (
  userId: string,
  lastDays?: number
): { total: number } => {
  const habits = getHabits(userId);

  return {
    total: habits.length,
  };
};
