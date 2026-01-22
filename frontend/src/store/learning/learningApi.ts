import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  CreateFlashcardRequest,
  CreateLearningPathRequest,
  Flashcard,
  LearningPath,
  UpdateFlashcardRequest,
  UpdateLearningPathRequest,
} from "./learningApi.types";

export const learningApi = createApi({
  reducerPath: "learningPathsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["LearningPath", "Flashcards"],
  endpoints: (builder) => ({
    // ------------------- LEARNING PATHS -------------------
    getLearningPaths: builder.query<LearningPath[], void>({
      query: () => "/learning/paths",
      providesTags: ["LearningPath"],
    }),
    getLearningPathById: builder.query<LearningPath, string>({
      query: (id) => `/learning/paths/${id}`,
      providesTags: (_r, _e, id) => [{ type: "LearningPath", id }],
    }),
    createLearningPath: builder.mutation<
      LearningPath,
      CreateLearningPathRequest
    >({
      query: (body) => ({
        url: "/learning/paths",
        method: "POST",
        body,
      }),
      invalidatesTags: ["LearningPath"],
    }),
    updateLearningPath: builder.mutation<
      LearningPath,
      { id: string; data: UpdateLearningPathRequest }
    >({
      query: ({ id, data }) => ({
        url: `/learning/paths/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["LearningPath"],
    }),
    deleteLearningPath: builder.mutation<boolean, string>({
      query: (id) => ({
        url: `/learning/paths/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["LearningPath"],
    }),
    // ------------------- LEARNING FLASHCARDS -------------------
    getFlashcards: builder.query<Flashcard[], string>({
      query: (pathId) => `/learning/paths/${pathId}/flashcards`,
      providesTags: (_r, _e, id) => [{ type: "Flashcards", id }],
    }),
    createFlashcard: builder.mutation<
      Flashcard,
      { pathId: string; data: CreateFlashcardRequest }
    >({
      query: ({ pathId, data }) => ({
        url: `/learning/paths/${pathId}/flashcards`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Flashcards"],
    }),
    updateFlashcard: builder.mutation<
      Flashcard,
      { id: string; data: UpdateFlashcardRequest }
    >({
      query: ({ id, data }) => ({
        url: `/learning/flashcards/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Flashcards"],
    }),
    deleteFlashcard: builder.mutation<boolean, string>({
      query: (id) => ({
        url: `/learning/flashcards/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Flashcards"],
    }),
  }),
});

export const {
  useGetLearningPathsQuery,
  useGetLearningPathByIdQuery,
  useCreateLearningPathMutation,
  useUpdateLearningPathMutation,
  useDeleteLearningPathMutation,

  useGetFlashcardsQuery,
  useCreateFlashcardMutation,
  useUpdateFlashcardMutation,
  useDeleteFlashcardMutation,
} = learningApi;
