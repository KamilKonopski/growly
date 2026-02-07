import { getHabits } from "./habitService";
import { getHabitsStatusForDate } from "./habitStatusService";

import { HabitStats, LearningStats } from "../types/Stats";
import { getLearningPaths } from "./learningPathsService";
import { getLearningFlashcards } from "./flashcardService";

const LAST_DAYS = 7;

export const getHabitStats = (userId: string): HabitStats => {
  const habits = getHabits(userId);

  const dailyCompletions: { date: string; count: number }[] = [];

  let completedTotal = 0;

  for (let i = LAST_DAYS - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const dateStr = date.toISOString().slice(0, 10);

    const statuses = getHabitsStatusForDate(userId, dateStr);
    const completed = statuses.filter((s) => s.isCompleted).length;

    completedTotal += completed;

    dailyCompletions.push({
      date: dateStr,
      count: completed,
    });
  }

  const totalPossible = habits.length * LAST_DAYS;

  const completionRate =
    totalPossible === 0
      ? 0
      : Math.round((completedTotal / totalPossible) * 100);

  return {
    totalHabits: habits.length,
    activeHabits: habits.length,
    completionRate,
    dailyCompletions,
  };
};

export const getLearningStats = (userId: string): LearningStats => {
  const paths = getLearningPaths(userId);

  let totalFlashcards = 0;
  let knownFlashcards = 0;

  const progressPerPath = paths.map((path) => {
    const flashcards = getLearningFlashcards(userId, path.id);

    const known = flashcards.filter((f) => f.known).length;

    totalFlashcards += flashcards.length;
    knownFlashcards += known;

    const progress =
      flashcards.length === 0
        ? 0
        : Math.round((known / flashcards.length) * 100);

    return {
      pathId: path.id,
      name: path.name,
      progress,
    };
  });

  return {
    totalPaths: paths.length,
    totalFlashcards,
    knownFlashcards,
    progressPerPath,
  };
};
