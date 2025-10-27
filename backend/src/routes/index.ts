import { Router } from "express";

import authRoutes from "./auth";

const router = Router();

router.use("/auth", authRoutes);

router.get("/", (req, res) => {
  res.json({ message: "Growly API is running..." });
});

export default router;
