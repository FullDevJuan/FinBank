import { Router } from "express";
import {
  createTransaction,
  read,
} from "../controllers/transactionControllers.js";
import { verifyToken } from "../../../../../../shared/middlewares/auth.js";

const router = Router();
router.get("/", verifyToken, read);
router.post("/create", verifyToken, createTransaction);

export default router;
