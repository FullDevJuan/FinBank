import express from "express";
import userRouter from "./src/routes/userRoutes.js";

const router = express.Router();

router.use("/", userRouter);

export default router;
