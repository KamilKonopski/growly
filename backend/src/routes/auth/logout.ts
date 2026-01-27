import { Router, Response } from "express";

import { authMiddleware, AuthRequest } from "../../middleware/auth";

const router = Router();

// POST /api/auth/logout
router.post("/", authMiddleware, (req: AuthRequest, res: Response) => {
  return res.json({
    message: "Pomyślnie wylogowano!",
  });
});

export default router;
