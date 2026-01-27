import { Router } from "express";

import checkEmailRoute from "./check-email";
import meRoute from "./me";
import loginRoute from "./login";
import logoutRoute from "./logout";
import registerRoute from "./register";

const router = Router();

router.use("/login", loginRoute);
router.use("/logout", logoutRoute);
router.use("/register", registerRoute);
router.use("/check-email", checkEmailRoute);
router.use("/me", meRoute);

export default router;
