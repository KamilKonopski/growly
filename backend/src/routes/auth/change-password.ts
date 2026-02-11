import { Router, Response } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";

import { authMiddleware, AuthRequest } from "../../middleware/auth";
import { readUsers, writeUsers } from "../../utils/fileStorage";

const router = Router();

// PUT /api/auth/change-password
router.put(
  "/",
  authMiddleware,
  [
    body("currentPassword").notEmpty(),
    body("newPassword")
      .isLength({ min: 8 })
      .matches(/[a-z]/)
      .matches(/[A-Z]/)
      .matches(/[0-9]/)
      .matches(/[!@#$%^&*(),.?":{}|<>]/),
  ],
  async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { currentPassword, newPassword } = req.body;
    const users = readUsers();
    const user = users.find((u) => u.id === req.user?.id);

    if (!user) {
      return res.status(404).json({ message: "Użytkownik nie istnieje" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Nieprawidłowe hasło" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    writeUsers(users);

    return res.json({ message: "Hasło zostało zmienione" });
  },
);

export default router;
