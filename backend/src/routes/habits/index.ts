import { Router } from "express";
import habitsRoutes from "./habits";
import habitLogsRoutes from "./habitLogs";
import habitStatusRoutes from "./habitStatus";

const router = Router();

router.use("/status", habitStatusRoutes); // /api/habits/status
router.use("/logs", habitLogsRoutes); // /api/habits/logs
router.use("/", habitsRoutes); // /api/habits

export default router;
