import { Router, Response } from "express";

import { getDashboardQuoteOfTheDay } from "../../services/quoteService";

import { authMiddleware, AuthRequest } from "../../middleware/auth";
import { today } from "../../utils/dateUtils";
import {
  getHabitsToday,
  getNewestLearningPaths,
} from "../../services/dashboardService";

const router = Router();

// GET /api/dashboard/quote - quote of the day
router.get("/quote", authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const quote = getDashboardQuoteOfTheDay(userId);

  res.json(quote);
});

// GET /api/dashboard/habits/today - uncompleted habits
router.get(
  "/habits/today",
  authMiddleware,
  (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const habits = getHabitsToday(userId, today());

    res.json(habits);
  },
);

// GET /api/dashboard/learning/paths/newest - newest learning paths
router.get(
  "/learning/paths/newest",
  authMiddleware,
  (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const newestLearningPaths = getNewestLearningPaths(userId);

    res.json(newestLearningPaths);
  },
);

export default router;
