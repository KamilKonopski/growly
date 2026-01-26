// HABITS
export interface DashboardHabits {
  id: string;
  name: string;
  date: string;
}

export interface DashboardHabitsDTO {
  totalHabits: number;
  todayHabits: DashboardHabits[];
}

// LEARNING
export interface DashboardLearningPath {
  id: string;
  name: string;
  knownFlashcards: number;
  totalFlashcards: number;
}
