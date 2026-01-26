// HABITS
export interface DashboardHabit {
  id: string;
  name: string;
  date: string;
}

// LEARNING
export interface DashboardLearningPath {
  id: string;
  name: string;
  knownFlashcards: number;
  totalFlashcards: number;
}
