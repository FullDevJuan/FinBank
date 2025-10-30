import express from "express";
import productRouter from "./src/routes/productRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    service: "FinBank Products Service",
    version: "1.0.0",
    endpoints: {
      products: "GET /api/products",
      health: "GET /health",
    },
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/products", productRouter);

export default app;
