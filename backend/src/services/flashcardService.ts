import { Flashcard } from "../types/Learning";
import {
  readLearningFlashcards,
  writeLearningFlashcards,
} from "../utils/fileStorage";

// Get all learning flashcards
export const getLearningFlashcards = (
  userId: string,
  pathId: string,
): Flashcard[] => {
  const flashcards = readLearningFlashcards();

  return flashcards.filter((f) => f.userId === userId && f.pathId === pathId);
};

// Create new learning flashcard
export const createLearningFlashcard = (
  userId: string,
  pathId: string,
  flashcardData: Omit<Flashcard, "id" | "userId" | "pathId" | "createdAt">,
): Flashcard => {
  const flashcards = readLearningFlashcards();

  const newFlashcard: Flashcard = {
    id: Date.now().toString(),
    userId,
    pathId,
    createdAt: new Date().toISOString(),
    ...flashcardData,
  };

  flashcards.push(newFlashcard);
  writeLearningFlashcards(flashcards);

  return newFlashcard;
};

// Update existing learning flashbard
export const updateLearningFlashcard = (
  userId: string,
  flashcardId: string,
  updatedData: Partial<Omit<Flashcard, "id" | "userId" | "createdAt">>,
): Flashcard | null => {
  const flashcards = readLearningFlashcards();
  const flashcardIndex = flashcards.findIndex(
    (f) => f.userId === userId && f.id === flashcardId,
  );

  if (flashcardIndex === -1) return null;

  flashcards[flashcardIndex] = {
    ...flashcards[flashcardIndex],
    ...updatedData,
  };

  writeLearningFlashcards(flashcards);

  return flashcards[flashcardIndex];
};

// Delete existing learning flashcard
export const deleteLearningFlashcard = (
  userId: string,
  flashcardId: string,
): boolean => {
  const flashcards = readLearningFlashcards();
  const filteredFlashcards = flashcards.filter(
    (f) => !(f.userId === userId && f.id === flashcardId),
  );

  if (filteredFlashcards.length === flashcards.length) return false;

  writeLearningFlashcards(filteredFlashcards);

  return true;
};
