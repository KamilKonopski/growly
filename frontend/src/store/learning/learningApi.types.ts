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

// LEARNING FLASHCARDS
export interface Flashcard {
  id: string;
  userId: string;
  pathId: string;
  front: string;
  back: string;
  tag?: string;
  known?: boolean;
  createdAt: string;
}

export interface CreateFlashcardRequest {
  front: string;
  back: string;
  tag?: string;
  known?: boolean;
}

export interface UpdateFlashcardRequest {
  front?: string;
  back?: string;
  tag?: string;
  known?: boolean;
}
