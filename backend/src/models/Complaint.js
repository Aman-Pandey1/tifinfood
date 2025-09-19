import mongoose, { Schema } from "mongoose";

const ComplaintSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    seller: { type: Schema.Types.ObjectId, ref: "User" },
    order: { type: Schema.Types.ObjectId, ref: "Order" },
    message: { type: String, required: true },
    status: { type: String, enum: ["OPEN", "IN_PROGRESS", "RESOLVED", "REJECTED"], default: "OPEN" },
  },
  { timestamps: true }
);

export const Complaint = mongoose.model("Complaint", ComplaintSchema);
