import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  DashboardHabitResponse,
  DashboardLearningPathsResponse,
  Quote,
} from "./dashboardApi.types";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["DashboardHabits"],
  endpoints: (builder) => ({
    // ------------------- QUOTE -------------------------------
    getQuoteOfTheDay: builder.query<Quote, void>({
      query: () => "/dashboard/quote",
    }),
    // ------------------- HABITS -------------------------------
    getTodayHabits: builder.query<DashboardHabitResponse, void>({
      query: () => "/dashboard/habits/today",
      providesTags: ["DashboardHabits"],
    }),
    // ------------------ Learning ------------------------------
    getNewestLearningPaths: builder.query<
      DashboardLearningPathsResponse[],
      void
    >({
      query: () => "/dashboard/learning/paths/newest",
    }),
  }),
});

export const {
  useGetQuoteOfTheDayQuery,
  useGetTodayHabitsQuery,
  useGetNewestLearningPathsQuery,
} = dashboardApi;
