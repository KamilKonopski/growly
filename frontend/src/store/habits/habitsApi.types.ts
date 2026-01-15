// HABITS
export interface Habit {
  id: string;
  userId: string;
  name: string;
  frequency: "daily" | "weekly" | "every_x_days";
  intervalDays?: number;
  createdAt: string;
}

export interface CreateHabitRequest {
  name: string;
  frequency: "daily" | "weekly" | "every_x_days";
  intervalDays?: number;
}

export interface UpdateHabitRequest {
  name?: string;
  frequency?: "daily" | "weekly" | "every_x_days";
  intervalDays?: number;
}

export interface HabitsSummaryResponse {
  total: number;
}

// HABIT LOGS
export interface HabitLog {
  id: string;
  habitId: string;
  userId: string;
  date: string;
}

export interface CreateHabitLogRequest {
  habitId: string;
  date: string;
}

export interface UpdateHabitLogRequest {
  date?: string;
}

export interface HabitLogStats {
  completed: number;
  total: number;
}
