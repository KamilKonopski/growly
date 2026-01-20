import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";

import {
  useGetHabitsQuery,
  useGetHabitByIdQuery,
  useCreateHabitMutation,
  useUpdateHabitMutation,
  useDeleteHabitMutation,
  useGetHabitsSummaryQuery,
  useGetHabitLogsQuery,
  useGetHabitLogByIdQuery,
  useCreateHabitLogMutation,
  useUpdateHabitLogMutation,
  useDeleteHabitLogMutation,
  useGetHabitLogsByDateRangeQuery,
  useGetHabitLogStatsQuery,
  useGetHabitsStatusQuery,
} from "../habits/habitsApi";

import {
  addHabit,
  updateHabit as updateHabitLocal,
  removeHabit,
  addHabitLog,
  updateHabitLog as updateLogLocal,
  removeHabitLog,
} from "../slices/habitsSlice";

import type {
  Habit,
  HabitLog,
  CreateHabitRequest,
  UpdateHabitRequest,
  CreateHabitLogRequest,
  UpdateHabitLogRequest,
} from "../habits/habitsApi.types";

export const useHabits = () => {
  const mode = useSelector((state: RootState) => state.app.mode);
  const local = useSelector((state: RootState) => state.habits);
  const dispatch = useDispatch();

  // ---------- Backend mutations ----------
  const [createHabitBackend] = useCreateHabitMutation();
  const [updateHabitBackend] = useUpdateHabitMutation();
  const [deleteHabitBackend] = useDeleteHabitMutation();

  const [createHabitLogBackend] = useCreateHabitLogMutation();
  const [updateHabitLogBackend] = useUpdateHabitLogMutation();
  const [deleteHabitLogBackend] = useDeleteHabitLogMutation();

  // ---------- Backend queries ----------
  const habitsQuery = useGetHabitsQuery(undefined, {
    skip: mode !== "backend",
  });
  const habitLogsQuery = useGetHabitLogsQuery(
    { habitId: undefined, lastDays: undefined },
    { skip: mode !== "backend" },
  );

  const statusQuery = useGetHabitsStatusQuery(
    {},
    {
      skip: mode !== "backend",
    },
  );

  // ---------- HABITS ----------
  const createHabit = async (data: CreateHabitRequest): Promise<Habit> => {
    if (mode === "backend") return await createHabitBackend(data).unwrap();

    const habit: Habit = {
      ...data,
      id: Date.now().toString(),
      userId: "demo-user",
      createdAt: new Date().toISOString(),
    };
    dispatch(addHabit(habit));

    return habit;
  };
  const updateHabit = async (id: string, data: UpdateHabitRequest) => {
    if (mode === "backend")
      return await updateHabitBackend({ id, data }).unwrap();
    dispatch(updateHabitLocal({ id, data }));
  };
  const deleteHabit = async (id: string) => {
    if (mode === "backend") return await deleteHabitBackend(id).unwrap();
    dispatch(removeHabit(id));
  };
  // ---------- HABIT LOGS ----------
  const createHabitLog = async (
    data: CreateHabitLogRequest,
  ): Promise<HabitLog> => {
    if (mode === "backend") return await createHabitLogBackend(data).unwrap();

    const habitLog: HabitLog = {
      ...data,
      id: new Date().toDateString(),
      userId: "demo-user",
    };
    dispatch(addHabitLog(habitLog));

    return habitLog;
  };
  const updateHabitLog = async (logId: string, data: UpdateHabitLogRequest) => {
    if (mode === "backend")
      return await updateHabitLogBackend({ logId, data }).unwrap();
    dispatch(updateLogLocal({ id: logId, data }));
  };
  const deleteHabitLog = async (logId: string) => {
    if (mode === "backend") return await deleteHabitLogBackend(logId).unwrap();
    dispatch(removeHabitLog(logId));
  };
  // ---------- READ-ONLY ENDPOINTS ----------
  const summary = useGetHabitsSummaryQuery(undefined, {
    skip: mode !== "backend",
  });

  const isLoading =
    mode === "backend" && (habitsQuery.isLoading || habitLogsQuery.isLoading);

  return {
    mode,
    isLoading,

    // Habits
    habits: mode === "backend" ? (habitsQuery.data ?? []) : local.habits,
    createHabit,
    updateHabit,
    deleteHabit,
    // Habit Logs
    logs: mode === "backend" ? (habitLogsQuery.data ?? []) : local.habitLogs,
    createHabitLog,
    updateHabitLog,
    deleteHabitLog,
    // Read-only backend endpoints
    getHabitById: useGetHabitByIdQuery,
    getHabitLogById: useGetHabitLogByIdQuery,
    getHabitLogsByRange: useGetHabitLogsByDateRangeQuery,
    getHabitLogsStats: useGetHabitLogStatsQuery,

    summary,
    habitStatus:
      mode === "backend" ? (statusQuery.data ?? []) : local.habitStatus,
  };
};
