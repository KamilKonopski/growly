export interface Habit {
  id: string;
  userId: string;
  name: string;
  frequency: "daily" | "weekly" | "every_x_days";
  intervalDays?: number;
  createdAt: string;
}

export interface HabitLog {
  id: string;
  habitId: string;
  userId: string;
  date: string;
}
