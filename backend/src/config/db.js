import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";

export async function connectToDatabase() {
  mongoose.set("strictQuery", true);
  return mongoose.connect(MONGO_URI);
}
