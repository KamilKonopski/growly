import { useSelector } from "react-redux";

import type { RootState } from "../store";

import { useGetQuoteOfTheDayQuery } from "../dashboard/dashboardApi";

import type { Quote } from "../dashboard/dashboardApi.types";

export const useDashboard = () => {
  const mode = useSelector((state: RootState) => state.app.mode);

  // ---------- Backend mutations ----------

  // ---------- Backend queries ----------
  const quoteQuery = useGetQuoteOfTheDayQuery(undefined, {
    skip: mode !== "backend",
  });

  // ---------- QUOTE ----------
  const localQuote: Quote = {
    text: "'Każda zmiana zaczyna się od jednego, małego kroku.'",
    author: "Nieznany",
  };

  const isLoading = mode === "backend" && quoteQuery.isLoading;

  return {
    mode,
    isLoading,

    // Quote
    quote: mode === "backend" ? (quoteQuery.data ?? null) : localQuote,
  };
};
