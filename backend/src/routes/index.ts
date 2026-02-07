import { Router } from "express";

import authRoutes from "./auth/index";
import habitRoutes from "./habits/index";
import learningRoutes from "./learning/index";
import dashboardRoutes from "./dashboard/index";
import statsRoutes from "./stats/index";

const router = Router();

router.use("/auth", authRoutes);
router.use("/habits", habitRoutes);
router.use("/learning", learningRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/statistics", statsRoutes);

router.get("/", (req, res) => {
  res.json({ message: "Growly API is running..." });
});

export default router;
