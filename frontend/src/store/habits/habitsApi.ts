import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  Habit,
  CreateHabitRequest,
  UpdateHabitRequest,
  HabitsSummaryResponse,
  HabitLog,
  CreateHabitLogRequest,
  UpdateHabitLogRequest,
  HabitLogStats,
} from "./habitsApi.types";

export const habitsApi = createApi({
  reducerPath: "habitsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Habit", "HabitLog"],
  endpoints: (builder) => ({
    // ------------------- HABITS -------------------------------
    getHabits: builder.query<Habit[], void>({
      query: () => "/habits",
      providesTags: ["Habit"],
    }),
    getHabitById: builder.query<Habit, string>({
      query: (id) => `/habits/${id}`,
      providesTags: (_r, _e, id) => [{ type: "Habit", id }],
    }),
    createHabit: builder.mutation<Habit, CreateHabitRequest>({
      query: (body) => ({
        url: "/habits",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Habit"],
    }),
    updateHabit: builder.mutation<
      Habit,
      { id: string; data: UpdateHabitRequest }
    >({
      query: ({ id, data }) => ({
        url: `habits/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Habit"],
    }),
    deleteHabit: builder.mutation<boolean, string>({
      query: (id) => ({
        url: `/habits/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Habit"],
    }),
    getHabitsSummary: builder.query<HabitsSummaryResponse, void>({
      query: () => "/habits/summary",
    }),
    // ------------------- HABIT LOGS -------------------------------
    getHabitLogs: builder.query<
      HabitLog[],
      { habitId?: string; lastDays?: number }
    >({
      query: (params) => ({
        url: "habits/logs",
        params,
      }),
      providesTags: ["HabitLog"],
    }),
    getHabitLogById: builder.query<HabitLog, string>({
      query: (logId) => `/habits/logs/${logId}`,
      providesTags: (_r, _e, logId) => [{ type: "HabitLog", id: logId }],
    }),
    createHabitLog: builder.mutation<HabitLog, CreateHabitLogRequest>({
      query: (body) => ({
        url: "/habits/logs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["HabitLog"],
    }),
    updateHabitLog: builder.mutation<
      HabitLog,
      { logId: string; data: UpdateHabitLogRequest }
    >({
      query: ({ logId, data }) => ({
        url: `/habits/logs/${logId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_r, _e, arg) => [{ type: "HabitLog", id: arg.logId }],
    }),
    deleteHabitLog: builder.mutation<boolean, string>({
      query: (logId) => ({
        url: `/habits/logs/${logId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["HabitLog"],
    }),
    getHabitLogsByDateRange: builder.query<
      HabitLog[],
      { startDate: string; endDate: string }
    >({
      query: ({ startDate, endDate }) =>
        `/habits/logs/range/${startDate}/${endDate}`,
    }),
    getHabitLogStats: builder.query<
      HabitLogStats,
      { habitId: string; lastDays?: number }
    >({
      query: ({ habitId, lastDays }) => ({
        url: `habits/logs/stats/${habitId}`,
        params: { lastDays },
      }),
    }),
  }),
});

export const {
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
} = habitsApi;
