import { Router } from "express";
import {
  createInteraction,
  read,
  updateInteraction,
} from "../controllers/interactionControllers.js";
import { verifyToken } from "../../../../../../shared/middlewares/auth.js";

const router = Router();

router.get("/", verifyToken, read);
router.post("/create", verifyToken, createInteraction);
router.put("/update", verifyToken, updateInteraction);
export default router;
