import mongoose from "mongoose";

export default async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/store");
    console.log(">> DB Connected");
  } catch (error) {
    console.log(error);
  }
}
