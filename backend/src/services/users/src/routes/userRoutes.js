import { Router } from "express";
import { read, create, update } from "../controllers/userController.js";
// import { pool } from "../../../../core/db.js";

const router = Router();

router.get("/", read);

router.post("/create", create);

router.put("/update/:id", update);

export default router;
