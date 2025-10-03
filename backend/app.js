import express from "express";
import { usersRouter } from "./src/modules/users/routes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

app.use("/api/users", usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server on http://localhost:${PORT}`);
});
