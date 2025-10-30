import express from "express";
import userService from "./src/services/users/index.js";
import customerService from "./src/services/customers/index.js";
import transactionService from "./src/services/transactions/index.js";
import accountService from "./src/services/accounts/index.js";
import interactionService from "./src/services/interactions/index.js";
import customerProductService from "./src/services/customer_products/index.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

app.use("/api/users", userService);
app.use("/api/customers", customerService);
app.use("/api/transactions", transactionService);
app.use("/api/accounts", accountService);
app.use("/api/interactions", interactionService);
app.use("/api/customer_products", customerProductService);

export default app;
