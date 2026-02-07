import { Router } from "express";

import statsRoutes from "./stats";

const router = Router();

router.use("/", statsRoutes); // /api/stats

export default router;
