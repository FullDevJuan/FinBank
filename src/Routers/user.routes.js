import { Router } from "express";
import Users from "../database/models/users.js";

export const userRouter = Router();

userRouter.get("/", async (req, res) => {
  try {
    const data = await Users.find();
    data.length > 0
      ? res.json(data)
      : res.json({ msg: "No users created yet" });
  } catch (error) {
    res.status(500).json({ msg: "Error to find Users" });
  }
});

userRouter.post("/filter", async (req, res) => {
  const { body } = req;

  try {
    if (!body) return res.status(400).json({ msg: "Empty data" });

    const filteredUsers = await Users.find(body);
    filteredUsers.length > 0
      ? res.json(filteredUsers)
      : res.json({ msg: "No users matched" });
  } catch (error) {
    res.status(500).json({ msg: "Error to find User", error: error.message });
    console.log("Error:", error.message);
  }
});

userRouter.post("/create", async (req, res) => {
  const { body } = req;

  try {
    if (!body) return res.status(400).json({ msg: "Empty data" });

    await Users.create(body);
    res.json({ msg: "user created" });
  } catch (error) {
    res.status(400).json({ msg: "Error to create user", error: error.message });
    console.log("Error:", error.message);
  }
});

userRouter.put("/update/:id", async (req, res) => {
  const { params, body } = req;

  try {
    if (!body) return res.status(400).json({ msg: "Empty data" });

    await Users.updateOne({ _id: params.id }, { $set: body });
    res.json({ msg: "user updated" });
  } catch (error) {
    res.status(400).json({ msg: "Error to update user", error: error.message });
    console.log("Error:", error.message);
  }
});

userRouter.delete("/delete/:id", async (req, res) => {
  const { params } = req;

  try {
    await Users.deleteOne({ _id: params.id });
    res.json({ msg: "user deleted" });
  } catch (error) {
    res.status(400).json({ msg: "Error to delete user", error: error.message });
    console.log("Error:", error.message);
  }
});
