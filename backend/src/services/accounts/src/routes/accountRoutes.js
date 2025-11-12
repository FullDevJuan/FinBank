import { Router } from "express";
import {
  getAccountTransactions,
  read,
} from "../controllers/accountControllers.js";
import { verifyToken } from "../../../../../../shared/middlewares/auth.js";

const router = Router();

router.get("/", verifyToken, read);
router.get("/search/transactions/:id", verifyToken, getAccountTransactions);

export default router;
