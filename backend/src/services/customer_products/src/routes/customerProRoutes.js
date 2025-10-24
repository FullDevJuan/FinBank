import { Router } from "express";
import { read } from "../controllers/customerProControllers.js";

const router = Router();

router.get("/:id", read);

export default router;
