import { Router } from "express";
import interactionRouter from "./src/routes/interactionRoutes.js";

const router = Router();

router.use("/", interactionRouter);

export default router;
