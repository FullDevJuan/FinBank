import { Router } from "express";
import { read } from "../controllers/transactionControllers.js";

const router = Router();
router.get("/", read);

export default router;
