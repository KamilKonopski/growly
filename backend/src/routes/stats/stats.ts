import { Router, Response } from "express";

import { authMiddleware, AuthRequest } from "../../middleware/auth";
import { getHabitStats, getLearningStats } from "../../services/statsService";

const router = Router();

// GET /api/statistics/habits
router.get("/habits", authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const habitStats = getHabitStats(userId);

  res.json(habitStats);
});

// GET /api/statistics/learning
router.get("/learning", authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const learningStats = getLearningStats(userId);

  res.json(learningStats);
});

export default router;
