import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { readUsers } from "../../utils/fileStorage";

const router = Router();

// POST api/auth/check-email
router.post(
  "/",
  [body("email").isEmail()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;
    const users = readUsers();
    const existingEmail = users.find((u) => u.email === email);

    if (existingEmail) {
      return res.json({ available: false });
    }

    res.json({
      available: true,
    });
  }
);

export default router;
