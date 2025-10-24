import { Router } from "express";
import { read } from "../controllers/customerControllers.js";
const router = Router();

router.get("/", read);

export default router;
