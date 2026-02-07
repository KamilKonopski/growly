export interface HabitStats {
  totalHabits: number;
  activeHabits: number;
  completionRate: number;
  dailyCompletions: { date: string; count: number }[];
}

export interface LearningStats {
  totalPaths: number;
  totalFlashcards: number;
  knownFlashcards: number;
  progressPerPath: { pathId: string; name: string; progress: number }[];
}
