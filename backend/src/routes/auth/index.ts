import { Router } from "express";

import checkEmailRoute from "./check-email";
import meRoute from "./me";
import loginRoute from "./login";
import logoutRoute from "./logout";
import registerRoute from "./register";
import updateProfileRoute from "./update-profile";
import changePasswordRoute from "./change-password";

const router = Router();

router.use("/login", loginRoute);
router.use("/logout", logoutRoute);
router.use("/register", registerRoute);
router.use("/check-email", checkEmailRoute);
router.use("/me", meRoute);
router.use("/update-profile", updateProfileRoute);
router.use("/change-password", changePasswordRoute);

export default router;
