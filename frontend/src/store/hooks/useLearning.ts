import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import {
  useCreateLearningPathMutation,
  useDeleteLearningPathMutation,
  useGetLearningPathsQuery,
  useUpdateLearningPathMutation,
} from "../learning/learningApi";

import { addPath, removePath, updatePath } from "../slices/learningSlice";

import type {
  CreateLearningPathRequest,
  LearningPath,
  UpdateLearningPathRequest,
} from "../learning/learningApi.types";

export const useLearning = () => {
  const mode = useSelector((state: RootState) => state.app.mode);
  const local = useSelector((state: RootState) => state.learning);
  const dispatch = useDispatch();

  // ---------- Backend mutations ----------
  const [createLearningPathBackend] = useCreateLearningPathMutation();
  const [updateLearningPathBackend] = useUpdateLearningPathMutation();
  const [deleteLearningPathBackend] = useDeleteLearningPathMutation();

  // ---------- Backend queries ----------
  const learningPathQuery = useGetLearningPathsQuery(undefined, {
    skip: mode !== "backend",
  });

  // ---------- PATHS ----------
  const createLearningPath = async (
    data: CreateLearningPathRequest
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
    data: UpdateLearningPathRequest
  ) => {
    if (mode === "backend")
      return await updateLearningPathBackend({ id, data }).unwrap();
    dispatch(updatePath({ id, data }));
  };
  const deleteLearningPath = async (id: string) => {
    if (mode === "backend") return await deleteLearningPathBackend(id).unwrap();
    dispatch(removePath(id));
  };

  const isLoading = mode === "backend" && learningPathQuery.isLoading;

  return {
    mode,
    isLoading,

    // Paths
    paths: mode === "backend" ? learningPathQuery.data ?? [] : local.paths,
    createLearningPath,
    updateLearningPath,
    deleteLearningPath,
  };
};
