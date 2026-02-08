// HABIT STATISTICS
export interface HabitStatsResponse {
  totalHabits: number;
  activeHabits: number;
  completionRate: number;
  dailyCompletions: { date: string; count: number }[];
}

// LEARNING STATISTICS
export interface LearningStatsResponse {
  totalPaths: number;
  totalFlashcards: number;
  knownFlashcards: number;
  progressPerPath: { pathId: string; name: string; progress: number }[];
}
