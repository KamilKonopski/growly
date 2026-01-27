import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithAuth } from "../baseQueryWithAuth";

import { dashboardApi } from "../dashboard/dashboardApi";

import type {
  Habit,
  CreateHabitRequest,
  UpdateHabitRequest,
  HabitsSummaryResponse,
  HabitLog,
  CreateHabitLogRequest,
  UpdateHabitLogRequest,
  HabitLogStats,
  HabitStatus,
} from "./habitsApi.types";

export const habitsApi = createApi({
  reducerPath: "habitsApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Habit", "HabitLog", "HabitStatus"],
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(dashboardApi.util.invalidateTags(["DashboardHabits"]));
        } catch (error) {
          console.error("Błąd przy tworzeniu nawyku:", error);
        }
      },
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(dashboardApi.util.invalidateTags(["DashboardHabits"]));
        } catch (error) {
          console.error("Błąd przy edycji nawyku:", error);
        }
      },
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
      invalidatesTags: ["HabitLog", "HabitStatus"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(dashboardApi.util.invalidateTags(["DashboardHabits"]));
        } catch (error) {
          console.error("Błąd przy tworzeniu logu nawyku:", error);
        }
      },
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(dashboardApi.util.invalidateTags(["DashboardHabits"]));
        } catch (error) {
          console.error("Błąd przy tworzeniu logu nawyku:", error);
        }
      },
    }),
    deleteHabitLog: builder.mutation<boolean, string>({
      query: (logId) => ({
        url: `/habits/logs/${logId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["HabitLog", "HabitStatus"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(dashboardApi.util.invalidateTags(["DashboardHabits"]));
        } catch (error) {
          console.error("Błąd przy tworzeniu logu nawyku:", error);
        }
      },
    }),
    getHabitLogsByDateRange: builder.query<
      HabitLog[],
      { startDate: string; endDate: string }
    >({
      query: ({ startDate, endDate }) =>
        `/habits/logs/range/${startDate}/${endDate}`,
      providesTags: ["HabitLog"],
    }),
    getHabitLogStats: builder.query<
      HabitLogStats,
      { habitId: string; lastDays?: number }
    >({
      query: ({ habitId, lastDays }) => ({
        url: `habits/logs/stats/${habitId}`,
        params: { lastDays },
      }),
      providesTags: ["HabitLog"],
    }),
    getHabitsStatus: builder.query<HabitStatus[], { date?: string }>({
      query: (params) => ({
        url: "/habits/status",
        params,
      }),
      providesTags: ["HabitStatus"],
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

  useGetHabitsStatusQuery,
} = habitsApi;
