import { Router } from "express";
import { read } from "../controllers/accountControllers.js";
import { verifyToken } from "../../../../../../shared/middlewares/auth.js";

const router = Router();

router.get("/", verifyToken, read);

export default router;
