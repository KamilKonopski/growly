// HABITS
export interface Habit {
  id: string;
  userId: string;
  name: string;
  frequency: "daily" | "weekly" | "every_x_days";
  timesPerWeek?: number;
  intervalDays: number;
  createdAt: string;
}

export interface CreateHabitRequest {
  name: string;
  frequency: "daily" | "weekly" | "every_x_days";
  timesPerWeek?: number;
  intervalDays: number;
}

export interface UpdateHabitRequest {
  name?: string;
  frequency?: "daily" | "weekly" | "every_x_days";
  timesPerWeek?: number;
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
  completed: boolean;
}

export interface CreateHabitLogRequest {
  habitId: string;
  date: string;
  completed: boolean;
}

export interface UpdateHabitLogRequest {
  date?: string;
  completed?: boolean;
}

export interface HabitLogStats {
  completed: number;
  total: number;
}
