import { Router, Response } from "express";
import { authMiddleware, AuthRequest } from "../../middleware/auth";
import {
  getHabitLogs,
  getHabitLogById,
  createHabitLog,
  updateHabitLog,
  deleteHabitLog,
  getHabitLogsByDateRange,
  getHabitCompletionStats,
} from "../../services/habitLogsService";

const router = Router();

// GET /api/habits/logs (optionally filter by habitId or lastDays)
router.get("/", authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { habitId, lastDays } = req.query;

  const logs = getHabitLogs(
    userId,
    habitId as string | undefined,
    lastDays ? parseInt(lastDays as string) : undefined
  );

  res.json(logs);
});

// GET /api/habits/logs/:logId
router.get("/:logId", authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { logId } = req.params;

  const log = getHabitLogById(userId, logId);

  if (!log) return res.status(404).json({ message: "Log nie istnieje" });

  res.json(log);
});

// POST /api/habits/logs
router.post("/", authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { habitId, date } = req.body;

  if (!habitId || !date === undefined) {
    return res.status(400).json({ message: "Wymagane pola: habitId, date" });
  }

  const log = createHabitLog(userId, habitId, date);
  res.status(201).json(log);
});

// PUT /api/habits/logs/:logId
router.put("/:logId", authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { logId } = req.params;

  const updated = updateHabitLog(userId, logId, req.body);

  if (!updated) return res.status(404).json({ message: "Log nie istnieje" });

  res.json(updated);
});

// DELETE /api/habits/logs/:logId
router.delete("/:logId", authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { logId } = req.params;

  const ok = deleteHabitLog(userId, logId);

  if (!ok) return res.status(404).json({ message: "Log nie istnieje" });

  res.json({ success: true });
});

// GET /api/habits/logs/range/:startDate/:endDate
router.get(
  "/range/:startDate/:endDate",
  authMiddleware,
  (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const { startDate, endDate } = req.params;

    const logs = getHabitLogsByDateRange(userId, startDate, endDate);

    res.json(logs);
  }
);

// GET /api/habits/logs/stats/:habitId
router.get(
  "/stats/:habitId",
  authMiddleware,
  (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const { habitId } = req.params;
    const { lastDays } = req.query;

    const stats = getHabitCompletionStats(
      userId,
      habitId,
      lastDays ? parseInt(lastDays as string) : undefined
    );

    res.json(stats);
  }
);

export default router;
