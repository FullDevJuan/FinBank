import { Router } from "express";
import { read } from "../controllers/productControllers.js";

const router = Router();

router.get("/", read);

export default router;
