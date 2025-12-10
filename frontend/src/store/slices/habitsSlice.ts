import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  Habit,
  HabitLog,
  UpdateHabitRequest,
  UpdateHabitLogRequest,
} from "../habits/habitsApi.types";

interface HabitsState {
  habits: Habit[];
  habitLogs: HabitLog[];
}

const initialState: HabitsState = {
  habits: [],
  habitLogs: [],
};

const habitsSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    // ------- HABITS ---------
    addHabit(state, action: PayloadAction<Habit>) {
      state.habits.push(action.payload);
    },
    updateHabit(
      state,
      action: PayloadAction<{ id: string; data: UpdateHabitRequest }>
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
        (l) => l.habitId !== action.payload
      );
    },
    // ------- HABIT LOGS ---------
    addHabitLog(state, action: PayloadAction<HabitLog>) {
      state.habitLogs.push(action.payload);
    },
    updateHabitLog(
      state,
      action: PayloadAction<{ id: string; data: UpdateHabitLogRequest }>
    ) {
      const index = state.habitLogs.findIndex(
        (l) => l.id === action.payload.id
      );

      if (index !== -1) {
        state.habitLogs[index] = {
          ...state.habitLogs[index],
          ...action.payload.data,
        };
      }
    },
    removeHabitLog(state, action: PayloadAction<string>) {
      state.habitLogs = state.habitLogs.filter((l) => l.id !== action.payload);
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
