import { Router } from "express";
import { read } from "../controllers/interactionControllers.js";

const router = Router();

router.get("/", read);

export default router;
