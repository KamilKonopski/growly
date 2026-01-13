import { Router, Response } from "express";
import { authMiddleware, AuthRequest } from "../../middleware/auth";
import { getHabitsStatusForDate } from "../../services/habitStatusService";

const router = Router();

// GET /api/habits/status?date=YYYY-MM-DD
router.get("/", authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const date =
    (req.query.date as string) ?? new Date().toISOString().slice(0, 10);

  res.json(getHabitsStatusForDate(userId, date));
});

export default router;
