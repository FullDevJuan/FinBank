import { Router } from "express";
import customerProRouter from "./src/routes/customerProRoutes.js";

const router = Router();

router.use("/", customerProRouter);

export default router;
