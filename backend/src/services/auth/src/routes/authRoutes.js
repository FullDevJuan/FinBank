import { Router } from "express";
import { login } from "../controllers/authContollers.js";

const router = Router();

router.post("/login", login);

// router.post("/logout", (req, res) => {
//   // Logout logic here
// });

export default router;
