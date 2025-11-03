import { Router } from "express";
import { read } from "../controllers/customerProControllers.js";
import { verifyToken } from "../../../../../../shared/middlewares/auth.js";

const router = Router();

router.get("/:id", verifyToken, read);

export default router;
