import express from "express";
import authRouter from "./src/routes/authRoutes.js";

const router = express.Router();

router.use("/", authRouter);

export default router;
