import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IReview extends Document {
  customer: Types.ObjectId;
  seller: Types.ObjectId;
  rating: number;
  comment?: string;
}

const ReviewSchema = new Schema<IReview>(
  {
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
  },
  { timestamps: true }
);

export const Review: Model<IReview> = mongoose.model<IReview>("Review", ReviewSchema);
