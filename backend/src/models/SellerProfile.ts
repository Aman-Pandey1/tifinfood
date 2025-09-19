import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface ISellerProfile extends Document {
  user: Types.ObjectId;
  shopName: string;
  documents: string[];
  isApproved: boolean;
  description?: string;
  address?: string;
}

const SellerProfileSchema = new Schema<ISellerProfile>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    shopName: { type: String, required: true },
    documents: [{ type: String }],
    isApproved: { type: Boolean, default: false },
    description: String,
    address: String,
  },
  { timestamps: true }
);

export const SellerProfile: Model<ISellerProfile> = mongoose.model<ISellerProfile>(
  "SellerProfile",
  SellerProfileSchema
);
