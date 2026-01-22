import { Router, Response } from "express";

import { getDashboardQuoteOfTheDay } from "../../services/quoteService";

import { authMiddleware, AuthRequest } from "../../middleware/auth";

const router = Router();

// GET /api/dashboard/quote - quote of the day
router.get("/quote", authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const quote = getDashboardQuoteOfTheDay(userId);

  res.json(quote);
});

export default router;
