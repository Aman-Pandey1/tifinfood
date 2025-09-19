import mongoose from "mongoose";
import { MONGO_URI } from "./env";

export async function connectToDatabase(): Promise<typeof mongoose> {
  mongoose.set("strictQuery", true);
  return mongoose.connect(MONGO_URI);
}
