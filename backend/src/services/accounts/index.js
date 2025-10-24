import accountRouter from "./src/routes/accountRoutes.js";
import { Router } from "express";

const router = Router();

router.use("/", accountRouter);

export default router;
