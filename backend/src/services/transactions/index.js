import { Router } from "express";
import transactionRouter from "./src/routes/transactionRoutes.js";

const router = Router();
router.use("/", transactionRouter);

export default router;
