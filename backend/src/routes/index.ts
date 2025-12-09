import { Router } from "express";

import authRoutes from "./auth/index";
import habitRoutes from "./habits/index";

const router = Router();

router.use("/auth", authRoutes);
router.use("/habits", habitRoutes);

router.get("/", (req, res) => {
  res.json({ message: "Growly API is running..." });
});

export default router;
