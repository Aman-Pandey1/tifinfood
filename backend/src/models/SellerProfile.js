import mongoose, { Schema } from "mongoose";

const SellerProfileSchema = new Schema(
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

export const SellerProfile = mongoose.model("SellerProfile", SellerProfileSchema);
