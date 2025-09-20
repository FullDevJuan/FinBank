import express from "express";
import { userRouter } from "./Routers/user.routes.js";
import connectDB from "./database/connection.js";
import cors from "cors";

const app = express();
const PORT = 8000;
const HOSTNAME = "127.0.0.1";

// Middlewares
app.use(express.json());
app.use((req, res, next) => {
  const { httpVersion, method, url, headers } = req;
  console.log(
    `HTTP ${httpVersion} ${method} ${url} (${headers["user-agent"]})`
  );
  next();
});
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Connection to DB
connectDB();

// Routers
app.use("/api/users", userRouter);

app.listen(PORT, HOSTNAME, () => {
  console.log(`server on http://${HOSTNAME}:${PORT}`);
});
