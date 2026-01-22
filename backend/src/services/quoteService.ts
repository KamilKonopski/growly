import { getHabits } from "./habitService";
import { getLearningPaths } from "./learningPathsService";

import { getDaySeed } from "../utils/dateUtils";
import { readDashboardQuotes } from "../utils/fileStorage";

import { Quote, QuoteDto } from "../types/Quote";

const pickQuoteOfTheDay = (quotes: Quote[]): Quote => {
  const seed = getDaySeed();
  const index = seed % quotes.length;
  return quotes[index];
};

export const getDashboardQuoteOfTheDay = (userId: string): QuoteDto => {
  const habits = getHabits(userId);
  const learningPaths = getLearningPaths(userId);
  const quotes = readDashboardQuotes();

  let filteredQuotes: Quote[];

  if (habits.length === 0 || learningPaths.length === 0) {
    filteredQuotes = quotes.filter((q) => q.type === "start");
  } else {
    filteredQuotes = quotes.filter((q) => q.type === "continue");
  }

  if (filteredQuotes.length === 0) {
    throw new Error("Brak cytatów do wyświetlenia");
  }

  const quote = pickQuoteOfTheDay(filteredQuotes);

  return {
    text: quote.text,
    author: quote.author,
  };
};
