import { Router } from "express";
import { read, create, update } from "./controller.js";
import { pool } from "../../config/db.js";

export const usersRouter = Router();

usersRouter.get("/", read);

usersRouter.post("/create", create);

usersRouter.put("/update/:id", update);
