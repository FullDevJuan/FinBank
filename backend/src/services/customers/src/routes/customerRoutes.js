import { Router } from "express";
import {
  createCustomer,
  read,
  updateCustomer,
} from "../controllers/customerControllers.js";
import { verifyToken } from "../../../../../../shared/middlewares/auth.js";
const router = Router();

router.get("/", verifyToken, read);
router.post("/create", verifyToken, createCustomer);
router.put("/update", verifyToken, updateCustomer);

export default router;
