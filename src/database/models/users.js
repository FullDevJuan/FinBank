import { Schema, model } from "mongoose";

const schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  edad: { type: Number, min: 0 },
  created_at: { type: Date, default: Date.now },
});

const Users = model("users", schema);
export default Users;
