import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  Habit,
  HabitLog,
  UpdateHabitRequest,
  UpdateHabitLogRequest,
  HabitStatus,
} from "../habits/habitsApi.types";

interface HabitsState {
  habits: Habit[];
  habitLogs: HabitLog[];
  habitStatus: HabitStatus[];
}

const initialState: HabitsState = {
  habits: [],
  habitLogs: [],
  habitStatus: [],
};

const habitsSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    // ------- HABITS ---------
    addHabit(state, action: PayloadAction<Habit>) {
      state.habits.push(action.payload);

      state.habitStatus.push({
        habitId: action.payload.id,
        isCompleted: false,
      });
    },
    updateHabit(
      state,
      action: PayloadAction<{ id: string; data: UpdateHabitRequest }>,
    ) {
      const index = state.habits.findIndex((h) => h.id === action.payload.id);

      if (index !== -1) {
        state.habits[index] = {
          ...state.habits[index],
          ...action.payload.data,
        };
      }
    },
    removeHabit(state, action: PayloadAction<string>) {
      state.habits = state.habits.filter((h) => h.id !== action.payload);
      state.habitLogs = state.habitLogs.filter(
        (l) => l.habitId !== action.payload,
      );
      state.habitStatus = state.habitStatus.filter(
        (s) => s.habitId !== action.payload,
      );
    },
    // ------- HABIT LOGS ---------
    addHabitLog(state, action: PayloadAction<HabitLog>) {
      state.habitLogs.push(action.payload);

      const today = new Date().toISOString().slice(0, 10);
      if (action.payload.date !== today) return;

      const status = state.habitStatus.find(
        (s) => s.habitId === action.payload.habitId,
      );

      if (status) {
        status.isCompleted = true;
      } else {
        state.habitStatus.push({
          habitId: action.payload.habitId,
          isCompleted: true,
        });
      }
    },
    updateHabitLog(
      state,
      action: PayloadAction<{ id: string; data: UpdateHabitLogRequest }>,
    ) {
      const index = state.habitLogs.findIndex(
        (l) => l.id === action.payload.id,
      );

      if (index !== -1) {
        state.habitLogs[index] = {
          ...state.habitLogs[index],
          ...action.payload.data,
        };
      }
    },
    removeHabitLog(state, action: PayloadAction<string>) {
      const log = state.habitLogs.find((l) => l.id === action.payload);
      if (!log) return;

      state.habitLogs = state.habitLogs.filter((l) => l.id !== action.payload);

      const today = new Date().toISOString().slice(0, 10);
      if (log.date !== today) return;

      const status = state.habitStatus.find((s) => s.habitId === log.habitId);

      if (status) {
        status.isCompleted = false;
      }
    },
  },
});

export const {
  addHabit,
  updateHabit,
  removeHabit,
  addHabitLog,
  updateHabitLog,
  removeHabitLog,
} = habitsSlice.actions;

export default habitsSlice.reducer;
