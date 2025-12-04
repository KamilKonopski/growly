import { Router } from "express";

import loginRoute from "./login";
import registerRoute from "./register";
import checkEmailRoute from "./check-email";
import meRoute from "./me";

const router = Router();

router.use("/login", loginRoute);
router.use("/register", registerRoute);
router.use("/check-email", checkEmailRoute);
router.use("/me", meRoute);

export default router;
