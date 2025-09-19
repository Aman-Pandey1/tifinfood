import mongoose, { Schema, Document, Model, Types } from "mongoose";

export type ComplaintStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "REJECTED";

export interface IComplaint extends Document {
  customer: Types.ObjectId;
  seller?: Types.ObjectId;
  order?: Types.ObjectId;
  message: string;
  status: ComplaintStatus;
}

const ComplaintSchema = new Schema<IComplaint>(
  {
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    seller: { type: Schema.Types.ObjectId, ref: "User" },
    order: { type: Schema.Types.ObjectId, ref: "Order" },
    message: { type: String, required: true },
    status: { type: String, enum: ["OPEN", "IN_PROGRESS", "RESOLVED", "REJECTED"], default: "OPEN" },
  },
  { timestamps: true }
);

export const Complaint: Model<IComplaint> = mongoose.model<IComplaint>("Complaint", ComplaintSchema);
