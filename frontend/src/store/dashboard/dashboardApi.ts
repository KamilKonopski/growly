import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Quote } from "./dashboardApi.types";

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
  tagTypes: [],
  endpoints: (builder) => ({
    // ------------------- QUOTE -------------------------------
    getQuoteOfTheDay: builder.query<Quote, void>({
      query: () => "/dashboard/quote",
    }),
  }),
});

export const { useGetQuoteOfTheDayQuery } = dashboardApi;
