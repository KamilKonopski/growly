import { Router } from "express";

import learningPathsRoutes from "./learningPaths";

const router = Router();

router.use("/paths", learningPathsRoutes); // api/learning/paths

export default router;
