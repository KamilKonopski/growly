import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type {
  LearningPath,
  UpdateLearningPathRequest,
} from "../learning/learningApi.types";

interface LearningState {
  paths: LearningPath[];
}

const initialState: LearningState = {
  paths: [],
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
      action: PayloadAction<{ id: string; data: UpdateLearningPathRequest }>
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
  },
});

export const { addPath, updatePath, removePath } = learningSlice.actions;

export default learningSlice.reducer;
