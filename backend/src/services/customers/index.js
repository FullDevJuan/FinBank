import express from "express";
import customerRouter from "./src/routes/customerRoutes.js";

const router = express.Router();

router.use("/", customerRouter);

export default router;
