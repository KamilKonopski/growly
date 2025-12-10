import { Router, Response } from "express";
import {
  getHabits,
  getHabitById,
  createHabit,
  updateHabit,
  deleteHabit,
  getHabitsSummary,
} from "../../services/habitService";
import { authMiddleware, AuthRequest } from "../../middleware/auth";

const router = Router();

// GET /api/habits - list of user habits
router.get("/", authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const habits = getHabits(userId);
  res.json(habits);
});

// GET /api/habits/summary
router.get("/summary", authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const lastDays = req.query.lastDays ? Number(req.query.lastDays) : undefined;

  const summary = getHabitsSummary(userId, lastDays);
  res.json(summary);
});

// GET /api/habits/:id
router.get("/:id", authMiddleware, (req: AuthRequest, res: Response) => {
  const habit = getHabitById(req.user!.id, req.params.id);

  if (!habit) {
    return res.status(404).json({ message: "Nawyk nie istnieje!" });
  }

  res.json(habit);
});

// POST /api/habits
router.post("/", authMiddleware, (req: AuthRequest, res: Response) => {
  const newHabit = createHabit(req.user!.id, req.body);
  res.status(201).json(newHabit);
});

// PUT /api/habits/:id
router.put("/:id", authMiddleware, (req: AuthRequest, res: Response) => {
  const updatedHabit = updateHabit(req.user!.id, req.params.id, req.body);

  if (!updatedHabit) {
    return res.status(404).json({ message: "Nawyk nie istnieje!" });
  }

  res.json(updatedHabit);
});

// DELETE /api/habits/:id
router.delete("/:id", authMiddleware, (req: AuthRequest, res: Response) => {
  const deletedHabit = deleteHabit(req.user!.id, req.params.id);

  if (!deletedHabit) {
    return res.status(404).json({ message: "Nawyk nie istnieje!" });
  }

  res.json({ success: true });
});

export default router;
