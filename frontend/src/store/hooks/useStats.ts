import { useSelector } from "react-redux";
import type { RootState } from "../store";

import {
  useGetHabitStatsQuery,
  useGetLearningStatsQuery,
} from "../stats/statsApi";

import type {
  HabitStatsResponse,
  LearningStatsResponse,
} from "../stats/statsApi.types";

export const useStats = () => {
  const mode = useSelector((state: RootState) => state.app.mode);

  const localHabits = useSelector((state: RootState) => state.habits);
  const localLearning = useSelector((state: RootState) => state.learning);

  // ---------- Backend queries ----------
  const habitStatsQuery = useGetHabitStatsQuery(undefined, {
    skip: mode !== "backend",
  });

  const learningStatsQuery = useGetLearningStatsQuery(undefined, {
    skip: mode !== "backend",
  });

  // ---------- HABITS STATS ----------
  const localHabitStats = (): HabitStatsResponse => {
    const LAST_DAYS = 7;

    const dailyCompletions: { date: string; count: number }[] = [];
    let completedTotal = 0;

    for (let i = LAST_DAYS - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().slice(0, 10);

      const completed = localHabits.habitLogs.filter(
        (l) => l.date === dateStr,
      ).length;

      completedTotal += completed;

      dailyCompletions.push({
        date: dateStr,
        count: completed,
      });
    }

    const totalPossible = localHabits.habits.length * LAST_DAYS;

    const completionRate =
      totalPossible === 0
        ? 0
        : Math.round((completedTotal / totalPossible) * 100);

    return {
      totalHabits: localHabits.habits.length,
      activeHabits: localHabits.habitStatus.filter((s) => s.isCompleted).length,
      completionRate,
      dailyCompletions,
    };
  };

  // ---------- LEARNING STATS ----------
  const localLearningStats = (): LearningStatsResponse => {
    let totalFlashcards = 0;
    let knownFlashcards = 0;

    const progressPerPath = localLearning.paths.map((path) => {
      const cards = localLearning.flashcards.filter(
        (f) => f.pathId === path.id,
      );

      const known = cards.filter((f) => f.known).length;

      totalFlashcards += cards.length;
      knownFlashcards += known;

      const progress =
        cards.length === 0 ? 0 : Math.round((known / cards.length) * 100);

      return {
        pathId: path.id,
        name: path.name,
        progress,
      };
    });

    return {
      totalPaths: localLearning.paths.length,
      totalFlashcards,
      knownFlashcards,
      progressPerPath,
    };
  };

  const isLoading =
    mode === "backend" &&
    (habitStatsQuery.isLoading || learningStatsQuery.isLoading);

  return {
    mode,
    isLoading,

    habitStats: mode === "backend" ? habitStatsQuery.data : localHabitStats(),
    learningStats:
      mode === "backend" ? learningStatsQuery.data : localLearningStats(),
  };
};
