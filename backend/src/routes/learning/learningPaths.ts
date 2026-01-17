import { Router, Response } from "express";

import {
  createLearningPath,
  deleteLearningPath,
  getLearningPathById,
  getLearningPaths,
  updateLearningPath,
} from "../../services/learningPathsService";

import { authMiddleware, AuthRequest } from "../../middleware/auth";

const router = Router();

// GET /api/learning/paths - list of all learning paths
router.get("/", authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const learningPaths = getLearningPaths(userId);
  res.json(learningPaths);
});

// GET /api/learning/paths/:id
router.get("/:id", authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const learningPath = getLearningPathById(userId, req.params.id);

  if (!learningPath) {
    return res.status(404).json({ message: "Ścieżka nauki nie istnieje!" });
  }

  res.json(learningPath);
});

// POST /api/learning/paths
router.post("/", authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const newLearningPath = createLearningPath(userId, req.body);
  res.status(201).json(newLearningPath);
});

// PUT /api/learning/paths/:id
router.put("/:id", authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const updatedLearningPath = updateLearningPath(
    userId,
    req.params.id,
    req.body
  );

  if (!updatedLearningPath) {
    return res.status(404).json({ message: "Ścieżka nauki nie istnieje!" });
  }

  res.json(updatedLearningPath);
});

// DELETE /api/learning/paths/:id
router.delete("/:id", authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const deletedLearningPath = deleteLearningPath(userId, req.params.id);

  if (!deletedLearningPath) {
    return res.status(404).json({ message: "Ścieżka nauki nie istnieje!" });
  }

  res.json({ success: true });
});

export default router;
