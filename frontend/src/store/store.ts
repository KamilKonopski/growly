import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "./auth/authApi";
import { habitsApi } from "./habits/habitsApi";
import { learningApi } from "./learning/learningApi";
import { dashboardApi } from "./dashboard/dashboardApi";

import appReducer from "./slices/appSlice";
import habitsReducer from "./slices/habitsSlice";
import learningReducer from "./slices/learningSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    [authApi.reducerPath]: authApi.reducer,
    [habitsApi.reducerPath]: habitsApi.reducer,
    habits: habitsReducer,
    [learningApi.reducerPath]: learningApi.reducer,
    learning: learningReducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(habitsApi.middleware)
      .concat(learningApi.middleware)
      .concat(dashboardApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
