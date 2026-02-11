import { Router, Response } from "express";
import { body, validationResult } from "express-validator";

import { authMiddleware, AuthRequest } from "../../middleware/auth";
import { readUsers, writeUsers } from "../../utils/fileStorage";

const router = Router();

// PUT /api/auth/update-profile
router.put(
  "/",
  authMiddleware,
  [
    body("name")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Imię musi mieć co najmniej 2 znaki")
      .matches(/^[A-Za-zÀ-ÿ]+$/)
      .withMessage("Imię może zawierać tylko litery"),
  ],
  (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const users = readUsers();
    const index = users.findIndex((u) => u.id === req.user?.id);

    if (index === -1) {
      return res.status(404).json({ message: "Użytkownik nie istnieje" });
    }

    users[index].name = req.body.name;
    writeUsers(users);

    return res.json({
      message: "Profil zaktualizowany",
      user: {
        id: users[index].id,
        email: users[index].email,
        name: users[index].name,
        createdAt: users[index].createdAt,
      },
    });
  },
);

export default router;
