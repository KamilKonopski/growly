import { useEffect, useRef, useState } from "react";

import EmptyState from "../../../common/components/EmptyState/EmptyState";
import FlashcardItem from "../FlashcardItem/FlashcardItem";

import { useLearning } from "../../../store/hooks/useLearning";
import { shuffle } from "../../../common/utils/shuffle";

import type { Flashcard } from "../../../common/types/learning";

import styles from "./StudyModal.module.css";

interface StudyModalProps {
  pathId: string;
  onClose: () => void;
}

const StudyModal = ({ pathId, onClose }: StudyModalProps) => {
  const { flashcards, updateLearningFlashcard } = useLearning(pathId);

  const [cards, setCards] = useState<Flashcard[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    if (!flashcards.length) return;

    setCards(shuffle([...flashcards]));
    setIndex(0);
    setFlipped(false);

    initializedRef.current = true;
  }, [flashcards]);

  if (!flashcards.length) {
    return (
      <EmptyState>
        <p>Nie masz żadnych fiszek. Dodaj pierwszą fiszkę.</p>
      </EmptyState>
    );
  }

  if (index >= cards.length) {
    const knownCount = flashcards.filter((f) => f.known).length;
    const finalMessage =
      (knownCount / flashcards.length) * 100 > 50
        ? "Gratulacje! Świetna robota!"
        : "Niestety! Spróbuj ponownie.";

    return (
      <div className={styles.final}>
        <h3>{finalMessage}</h3>
        <p>
          Twój wynik: {knownCount} / {flashcards.length}
        </p>
        <button onClick={onClose}>Zamknij</button>
      </div>
    );
  }

  const handleAnswer = async (known: boolean) => {
    setFlipped(true);
    await updateLearningFlashcard(cards[index].id, { known });
  };

  const handleNext = () => {
    setFlipped(false);

    setTimeout(() => {
      setIndex((i) => i + 1);
    }, 330);
  };

  return (
    <FlashcardItem
      key={cards[index].id}
      flashcard={cards[index]}
      mode="study"
      flipped={flipped}
      onFlip={() => setFlipped(true)}
      onAnswer={handleAnswer}
      onNext={handleNext}
    />
  );
};

export default StudyModal;
