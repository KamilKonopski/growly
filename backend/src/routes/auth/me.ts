import { Router, Response } from "express";
import { authMiddleware, AuthRequest } from "../../middleware/auth";
import { readUsers } from "../../utils/fileStorage";
import { User } from "../../types/User";

const router = Router();

// GET /api/auth/me
router.get("/", authMiddleware, (req: AuthRequest, res: Response) => {
  const users: User[] = readUsers();

  const user = users.find((u) => u.id === req.user?.id);

  if (!user) {
    return res.status(404).json({ message: "Użytkownik nie istnieje" });
  }

  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
  });
});

export default router;
