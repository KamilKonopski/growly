import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { readUsers, writeUsers } from "../../utils/fileStorage";
import { User } from "../../types/User";

const router = Router();

// POST api/auth/register
router.post(
  "/",
  [
    // --- NAME ---
    body("name")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Imię musi mieć co najmniej 2 znaki")
      .matches(/^[A-Za-zÀ-ÿ]+$/)
      .withMessage("Imię może zawierać tylko litery"),

    // --- EMAIL ---
    body("email").isEmail().withMessage("Podaj poprawny adres e-mail"),

    // --- PASSWORD ---
    body("password")
      .isLength({ min: 8 })
      .withMessage("Hasło musi mieć co najmniej 8 znaków")
      .matches(/[a-z]/)
      .withMessage("Hasło musi zawierać małą literę")
      .matches(/[A-Z]/)
      .withMessage("Hasło musi zawierać dużą literę")
      .matches(/[0-9]/)
      .withMessage("Hasło musi zawierać cyfrę")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("Hasło musi zawierać znak specjalny"),

    // --- CONFIRM PASSWORD ---
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw Error("Hasła muszą być takie same");
      }
      return true;
    }),
  ],
  async (req: Request, res: Response) => {
    // Walidacja wejścia
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // Odczyt użytkowników
    const users = readUsers();
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      return res.status(409).json({ message: "Taki email już istnieje" });
    }

    //Hashowanie hasła
    const hashedPassword = await bcrypt.hash(password, 10);

    // Nowy użytkownik
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    // Zapis
    writeUsers([...users, newUser]);

    return res.status(201).json({
      message: "Konto zostało utworzone. Możesz się teraz zalogować.",
    });
  }
);

export default router;
