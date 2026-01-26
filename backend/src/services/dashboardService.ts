import { getHabits } from "./habitService";
import { getHabitsStatusForDate } from "./habitStatusService";
import { getLearningPaths } from "./learningPathsService";
import { getLearningFlashcards } from "./flashcardService";

import {
  DashboardHabits,
  DashboardHabitsDTO,
  DashboardLearningPath,
} from "../types/Dashboard";

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
          date: habit.createdAt,
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

// get newest learning paths
export const getNewestLearningPaths = (
  userId: string,
  limit = 5,
): DashboardLearningPath[] => {
  const learningPaths = getLearningPaths(userId);

  //sort - recently created
  const sortedPaths = [...learningPaths].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return sortedPaths.slice(0, limit).map((path) => {
    const flashcards = getLearningFlashcards(userId, path.id);

    const totalFlashcards = flashcards.length;
    const knownFlashcards = flashcards.filter((f) => f.known).length;

    return {
      id: path.id,
      name: path.name,
      knownFlashcards,
      totalFlashcards,
    };
  });
};
