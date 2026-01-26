import { useSelector } from "react-redux";

import type { RootState } from "../store";

import {
  useGetNewestLearningPathsQuery,
  useGetQuoteOfTheDayQuery,
  useGetTodayHabitsQuery,
} from "../dashboard/dashboardApi";

import type {
  DashboardHabit,
  DashboardHabitResponse,
  DashboardLearningPathsResponse,
  Quote,
} from "../dashboard/dashboardApi.types";

export const useDashboard = () => {
  const mode = useSelector((state: RootState) => state.app.mode);
  const localHabits = useSelector((state: RootState) => state.habits.habits);
  const localHabitsStatus = useSelector(
    (state: RootState) => state.habits.habitStatus,
  );
  const localLearningPaths = useSelector(
    (state: RootState) => state.learning.paths,
  );
  const localLearningFlashcards = useSelector(
    (state: RootState) => state.learning.flashcards,
  );

  // ---------- Backend queries ----------
  const quoteQuery = useGetQuoteOfTheDayQuery(undefined, {
    skip: mode !== "backend",
  });

  const dashboardHabitsQuery = useGetTodayHabitsQuery(undefined, {
    skip: mode !== "backend",
  });

  const dashboardLearningPathsQuery = useGetNewestLearningPathsQuery(
    undefined,
    {
      skip: mode !== "backend",
    },
  );

  // ---------- QUOTE ----------
  const localQuote: Quote = {
    text: "Każda zmiana zaczyna się od jednego, małego kroku.",
    author: "Nieznany",
  };

  // ---------- HABITS ----------
  const localDashboardHabits = (): DashboardHabitResponse => {
    const totalHabits = localHabits.length;

    const todayHabits: DashboardHabit[] = localHabits
      .filter((habit) => {
        const status = localHabitsStatus.find((s) => s.habitId === habit.id);
        return status?.isCompleted === false;
      })
      .map((habit) => ({
        id: habit.id,
        name: habit.name,
        date: habit.createdAt,
      }));

    return {
      totalHabits,
      todayHabits,
    };
  };

  // ---------- LEARNING ----------
  const localDashboardLearningPaths = (): DashboardLearningPathsResponse[] => {
    return (
      [...localLearningPaths]
        // sort – newest first
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        // limit 5 (jak backend)
        .slice(0, 5)
        .map((path) => {
          const flashcards = localLearningFlashcards.filter(
            (f) => f.pathId === path.id,
          );

          const totalFlashcards = flashcards.length;
          const knownFlashcards = flashcards.filter((f) => f.known).length;

          return {
            id: path.id,
            name: path.name,
            knownFlashcards,
            totalFlashcards,
          };
        })
    );
  };

  const isLoading = mode === "backend" && quoteQuery.isLoading;

  return {
    mode,
    isLoading,

    // Quote
    quote: mode === "backend" ? (quoteQuery.data ?? null) : localQuote,
    // HABITS
    dashboardHabits:
      mode === "backend"
        ? (dashboardHabitsQuery.data ?? { totalHabits: 0, todayHabits: [] })
        : localDashboardHabits(),
    // LEARNING
    dashboardLearningPaths:
      mode === "backend"
        ? (dashboardLearningPathsQuery.data ?? [])
        : localDashboardLearningPaths(),
  };
};
