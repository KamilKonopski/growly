import { Router } from "express";

import flashcardsRoutes from "./flashcards";
import learningPathsRoutes from "./learningPaths";

const router = Router();

router.use("/paths", learningPathsRoutes); // api/learning/paths
router.use("/", flashcardsRoutes);

export default router;
