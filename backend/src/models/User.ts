import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { Role } from "../types/roles";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: Role;
  isBlocked: boolean;
  phone?: string;
  address?: string;
  location?: {
    type: "Point";
    coordinates: [number, number];
  };
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["ADMIN", "SELLER", "CUSTOMER"], default: "CUSTOMER" },
    isBlocked: { type: Boolean, default: false },
    phone: String,
    address: String,
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], default: [0, 0] },
    },
  },
  { timestamps: true }
);

UserSchema.index({ location: "2dsphere" });

export const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
