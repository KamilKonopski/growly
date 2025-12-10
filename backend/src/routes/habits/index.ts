import { Router } from "express";
import habitsRoutes from "./habits";
import habtLogsRoutes from "./habitLogs";

const router = Router();

router.use("/logs", habtLogsRoutes); // /api/habits/logs
router.use("/", habitsRoutes); // /api/habits

export default router;
