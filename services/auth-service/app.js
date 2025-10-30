import express from "express";
import authRouter from "./src/routes/authRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    service: "FinBank Auth Service",
    version: "1.0.0",
    endpoints: {
      login: "POST /api/auth/login",
      health: "GET /health",
    },
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRouter);

export default app;
