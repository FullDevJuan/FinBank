import { Router } from "express";
import { read } from "../controllers/accountControllers.js";

const router = Router();

router.get("/", read);

export default router;
