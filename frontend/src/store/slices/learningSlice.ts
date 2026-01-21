import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type {
  Flashcard,
  LearningPath,
  UpdateFlashcardRequest,
  UpdateLearningPathRequest,
} from "../learning/learningApi.types";

interface LearningState {
  paths: LearningPath[];
  flashcards: Flashcard[];
}

const initialState: LearningState = {
  paths: [],
  flashcards: [],
};

const learningSlice = createSlice({
  name: "learning",
  initialState,
  reducers: {
    // ------- PATHS ---------
    addPath(state, action: PayloadAction<LearningPath>) {
      state.paths.push(action.payload);
    },
    updatePath(
      state,
      action: PayloadAction<{ id: string; data: UpdateLearningPathRequest }>,
    ) {
      const index = state.paths.findIndex((p) => p.id === action.payload.id);

      if (index !== -1) {
        state.paths[index] = {
          ...state.paths[index],
          ...action.payload.data,
        };
      }
    },
    removePath(state, action: PayloadAction<string>) {
      state.paths = state.paths.filter((p) => p.id !== action.payload);
    },
    // ------- FLASHCARDS ---------
    addFlashcard(state, action: PayloadAction<Flashcard>) {
      state.flashcards.push(action.payload);
    },
    updateFlashcard(
      state,
      action: PayloadAction<{ id: string; data: UpdateFlashcardRequest }>,
    ) {
      const index = state.flashcards.findIndex(
        (f) => f.id === action.payload.id,
      );

      if (index !== -1) {
        state.flashcards[index] = {
          ...state.flashcards[index],
          ...action.payload.data,
        };
      }
    },
    removeFlashcard(state, action: PayloadAction<string>) {
      state.flashcards = state.flashcards.filter(
        (f) => f.id !== action.payload,
      );
    },
  },
});

export const {
  addPath,
  updatePath,
  removePath,

  addFlashcard,
  updateFlashcard,
  removeFlashcard,
} = learningSlice.actions;

export default learningSlice.reducer;
