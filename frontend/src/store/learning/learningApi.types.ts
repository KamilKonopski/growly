// LEARNING PATHS
export interface LearningPath {
  id: string;
  userId: string;
  name: string;
  description?: string;
  createdAt: string;
}

export interface CreateLearningPathRequest {
  name: string;
  description?: string;
}

export interface UpdateLearningPathRequest {
  name?: string;
  description?: string;
}
