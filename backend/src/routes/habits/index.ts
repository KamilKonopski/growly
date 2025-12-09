import { Router } from "express";
import habitsRoutes from "./habits";
import habtLogsRoutes from "./habitLogs";

const router = Router();

router.use("/", habitsRoutes); // /api/habits
router.use("/logs", habtLogsRoutes); // /api/habits/logs

export default router;
