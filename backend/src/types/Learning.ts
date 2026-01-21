export interface LearningPath {
  id: string;
  userId: string;
  name: string;
  description?: string;
  createdAt: string;
}

export interface Flashcard {
  id: string;
  userId: string;
  pathId: string;
  front: string;
  back: string;
  tag?: string;
  createdAt: string;
}
