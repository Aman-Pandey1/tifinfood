import mongoose, { Schema } from "mongoose";

const FoodItemSchema = new Schema(
  {
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    description: String,
    price: { type: Number, required: true, min: 0 },
    images: [{ type: String }],
    isAvailable: { type: Boolean, default: true },
    type: String,
  },
  { timestamps: true }
);

export const FoodItem = mongoose.model("FoodItem", FoodItemSchema);
