import express from "express";
import userService from "./src/services/users/index.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

app.use("/api/users", userService);

export default app;
