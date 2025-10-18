import { Router } from "express";
import { read, create, update } from "../controllers/userController.js";
import { verifyToken, verifyRol } from "../../../../core/middlewares/auth.js";

const router = Router();

router.get("/", verifyToken, verifyRol("Admin"), read);

router.post("/create", verifyToken, verifyRol("Admin"), create);

router.put("/update/:id", verifyToken, verifyRol("Admin"), update);

export default router;
