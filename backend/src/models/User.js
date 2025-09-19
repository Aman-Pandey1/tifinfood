import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
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

export const User = mongoose.model("User", UserSchema);
