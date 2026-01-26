import { Router } from "express";

import dashboardRoutes from "./dashboard";

const router = Router();

router.use("/", dashboardRoutes); // /api/dashboard

export default router;
