import { Router } from "express";
import {
  createCustomerProduct,
  read,
} from "../controllers/customerProControllers.js";
import { verifyToken } from "../../../../../../shared/middlewares/auth.js";

const router = Router();

router.get("/:id", verifyToken, read);
router.post("/register", verifyToken, createCustomerProduct);

export default router;
