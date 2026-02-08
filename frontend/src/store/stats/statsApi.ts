import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithAuth } from "../baseQueryWithAuth";

import type {
  HabitStatsResponse,
  LearningStatsResponse,
} from "./statsApi.types";

export const statsApi = createApi({
  reducerPath: "statsApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    // ------------------- HABITS STATS -------------------------------
    getHabitStats: builder.query<HabitStatsResponse, void>({
      query: () => "/statistics/habits",
    }),
    // ------------------- LEARNING STATS -----------------------------
    getLearningStats: builder.query<LearningStatsResponse, void>({
      query: () => "/statistics/learning",
    }),
  }),
});

export const { useGetHabitStatsQuery, useGetLearningStatsQuery } = statsApi;
