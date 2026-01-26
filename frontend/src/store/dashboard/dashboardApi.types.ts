// QUOTE
export interface Quote {
  text: string;
  author: "Nieznany";
}

// HABITS
export interface DashboardHabit {
  id: string;
  name: string;
  date: string;
}

export interface DashboardHabitResponse {
  totalHabits: number;
  todayHabits: DashboardHabit[];
}

export interface DashboardLearningPathsResponse {
  id: string;
  name: string;
  knownFlashcards: number;
  totalFlashcards: number;
}
