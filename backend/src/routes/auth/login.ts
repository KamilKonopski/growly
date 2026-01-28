import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { readUsers } from "../../utils/fileStorage";

const router = Router();

// POST /api/auth/login
router.post(
  "/",
  [
    body("email").isEmail().withMessage("Podaj poprawny adres e-mail"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Hasło musi mieć co najmniej 8 znaków"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const users = readUsers();
    const user = users.find((u) => u.email === email);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Nieprawidłowy e-mail lub hasło" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Nieprawidłowy e-mail lub hasło" });
    }

    // Token JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
      process.env.JWT_SECRET || "supersecret",
      { expiresIn: "2h" },
    );

    res.json({
      message: "Zalogowano pomyślnie",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
    });
  },
);

export default router;
