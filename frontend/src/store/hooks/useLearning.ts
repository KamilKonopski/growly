import { skipToken } from "@reduxjs/toolkit/query";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../store";
import {
  useCreateFlashcardMutation,
  useCreateLearningPathMutation,
  useDeleteFlashcardMutation,
  useDeleteLearningPathMutation,
  useGetFlashcardsQuery,
  useGetLearningPathsQuery,
  useUpdateFlashcardMutation,
  useUpdateLearningPathMutation,
} from "../learning/learningApi";

import {
  addFlashcard,
  addPath,
  removeFlashcard,
  removePath,
  updateFlashcard,
  updatePath,
} from "../slices/learningSlice";

import type {
  CreateFlashcardRequest,
  CreateLearningPathRequest,
  Flashcard,
  LearningPath,
  UpdateFlashcardRequest,
  UpdateLearningPathRequest,
} from "../learning/learningApi.types";

export const useLearning = (pathId?: string) => {
  const mode = useSelector((state: RootState) => state.app.mode);
  const local = useSelector((state: RootState) => state.learning);
  const dispatch = useDispatch();

  // ---------- Backend mutations ----------
  const [createLearningPathBackend] = useCreateLearningPathMutation();
  const [updateLearningPathBackend] = useUpdateLearningPathMutation();
  const [deleteLearningPathBackend] = useDeleteLearningPathMutation();

  const [createFlashcardBackend] = useCreateFlashcardMutation();
  const [updateFlashcardBackend] = useUpdateFlashcardMutation();
  const [deleteFlashcardBackend] = useDeleteFlashcardMutation();

  // ---------- Backend queries ----------
  const learningPathQuery = useGetLearningPathsQuery(undefined, {
    skip: mode !== "backend",
  });

  const flashcardQuery = useGetFlashcardsQuery(
    mode === "backend" && pathId ? pathId : skipToken,
  );

  // ---------- PATHS ----------
  const createLearningPath = async (
    data: CreateLearningPathRequest,
  ): Promise<LearningPath> => {
    if (mode === "backend")
      return await createLearningPathBackend(data).unwrap();

    const learningPath: LearningPath = {
      ...data,
      id: Date.now().toString(),
      userId: "demo-user",
      createdAt: new Date().toISOString(),
    };

    dispatch(addPath(learningPath));

    return learningPath;
  };
  const updateLearningPath = async (
    id: string,
    data: UpdateLearningPathRequest,
  ) => {
    if (mode === "backend")
      return await updateLearningPathBackend({ id, data }).unwrap();

    dispatch(updatePath({ id, data }));
  };
  const deleteLearningPath = async (id: string) => {
    if (mode === "backend") return await deleteLearningPathBackend(id).unwrap();

    dispatch(removePath(id));
  };

  // ---------- FLASHCARDS ----------
  const createLearningFlashcard = async (
    pathId: string,
    data: CreateFlashcardRequest,
  ): Promise<Flashcard> => {
    if (mode === "backend")
      return await createFlashcardBackend({ pathId, data }).unwrap();

    const flashcard: Flashcard = {
      ...data,
      pathId,
      id: Date.now().toString(),
      userId: "demo-user",
      createdAt: new Date().toISOString(),
    };
    dispatch(addFlashcard(flashcard));

    return flashcard;
  };
  const updateLearningFlashcard = async (
    id: string,
    data: UpdateFlashcardRequest,
  ) => {
    if (mode === "backend")
      return await updateFlashcardBackend({ id, data }).unwrap();

    dispatch(updateFlashcard({ id, data }));
  };
  const deleteLearningFlashcard = async (id: string) => {
    if (mode === "backend") return await deleteFlashcardBackend(id).unwrap();

    dispatch(removeFlashcard(id));
  };

  const isLoading =
    mode === "backend" &&
    (learningPathQuery.isLoading || flashcardQuery.isLoading);

  return {
    mode,
    isLoading,

    // Paths
    paths: mode === "backend" ? (learningPathQuery.data ?? []) : local.paths,
    createLearningPath,
    updateLearningPath,
    deleteLearningPath,

    // Flashcards
    flashcards:
      mode === "backend" ? (flashcardQuery.data ?? []) : local.flashcards,
    createLearningFlashcard,
    updateLearningFlashcard,
    deleteLearningFlashcard,
  };
};
