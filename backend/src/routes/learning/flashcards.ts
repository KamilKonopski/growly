import { Router, Response } from "express";
import {
  createLearningFlashcard,
  deleteLearningFlashcard,
  getLearningFlashcards,
  updateLearningFlashcard,
} from "../../services/flashcardService";
import { authMiddleware, AuthRequest } from "../../middleware/auth";

const router = Router();

// GET /api/learning/paths/:pathId/flashcards
router.get(
  "/paths/:pathId/flashcards",
  authMiddleware,
  (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const { pathId } = req.params;

    const flashcards = getLearningFlashcards(userId, pathId);
    res.json(flashcards);
  },
);

// POST /api/learning/paths/:pathId/flashcards
router.post(
  "/paths/:pathId/flashcards",
  authMiddleware,
  (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const { pathId } = req.params;
    const { front, back, tag } = req.body;

    if (!front || !back) {
      return res.status(400).json({ message: "Front i back są wymagane" });
    }

    const flashcard = createLearningFlashcard(userId, pathId, {
      front,
      back,
      tag,
    });

    res.status(201).json(flashcard);
  },
);

// PUT /api/learning/flashcards/:id
router.put(
  "/flashcards/:id",
  authMiddleware,
  (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const { id } = req.params;

    const updatedFlashcard = updateLearningFlashcard(userId, id, req.body);

    if (!updatedFlashcard) {
      return res.status(404).json({ message: "Flashcard nie istnieje!" });
    }

    res.json(updatedFlashcard);
  },
);

// DELETE /api/learning/flashcards/:id
router.delete(
  "/flashcards/:id",
  authMiddleware,
  (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const { id } = req.params;

    const deletedFlashcard = deleteLearningFlashcard(userId, id);

    if (!deletedFlashcard) {
      return res.status(404).json({ message: "Flashcard nie istnieje!" });
    }

    res.json({ success: true });
  },
);

export default router;
