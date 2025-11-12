import { Router } from "express";
import {
  createProduct,
  getCustomersByProductId,
  read,
  updateProduct,
} from "../controllers/productControllers.js";
import { verifyToken } from "../../../../shared/middlewares/auth.js";

const router = Router();

router.get("/", verifyToken, read);
router.get("/search/customers/:id", verifyToken, getCustomersByProductId);
router.post("/create", verifyToken, createProduct);
router.put("/update", verifyToken, updateProduct);

export default router;
