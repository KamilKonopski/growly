import { LearningPath } from "../types/Learning";
import { readLearningPaths, writeLearningPaths } from "../utils/fileStorage";

// Get all learning paths
export const getLearningPaths = (userId: string): LearningPath[] => {
  const learningPaths = readLearningPaths();

  return learningPaths.filter((l) => l.userId === userId);
};

// Get learning path by ID
export const getLearningPathById = (
  userId: string,
  learningPathId: string
): LearningPath | null => {
  const learningPaths = getLearningPaths(userId);

  return learningPaths.find((l) => l.id === learningPathId) || null;
};

// Create new learning path
export const createLearningPath = (
  userId: string,
  learningPathData: Omit<LearningPath, "id" | "userId" | "createdAt">
): LearningPath => {
  const learningPaths = readLearningPaths();

  const newLearningPath: LearningPath = {
    id: Date.now().toString(),
    userId,
    createdAt: new Date().toISOString(),
    ...learningPathData,
  };

  learningPaths.push(newLearningPath);
  writeLearningPaths(learningPaths);

  return newLearningPath;
};

// Update existing learning path
export const updateLearningPath = (
  userId: string,
  learningPathId: string,
  updatedData: Partial<Omit<LearningPath, "id" | "userId" | "createdAt">>
): LearningPath | null => {
  const learningPaths = readLearningPaths();
  const learningPathIndex = learningPaths.findIndex(
    (l) => l.userId === userId && l.id === learningPathId
  );

  if (learningPathIndex === -1) return null;

  learningPaths[learningPathIndex] = {
    ...learningPaths[learningPathIndex],
    ...updatedData,
  };

  writeLearningPaths(learningPaths);

  return learningPaths[learningPathIndex];
};

// Delete existing learning path
export const deleteLearningPath = (
  userId: string,
  learningPathId: string
): boolean => {
  const learningPaths = readLearningPaths();
  const filteredLearningPaths = learningPaths.filter(
    (l) => !(l.userId === userId && l.id === learningPathId)
  );

  if (filteredLearningPaths.length === learningPaths.length) return false;

  writeLearningPaths(filteredLearningPaths);

  return true;
};
