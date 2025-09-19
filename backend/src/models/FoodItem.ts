import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IFoodItem extends Document {
  seller: Types.ObjectId;
  name: string;
  description?: string;
  price: number;
  images: string[];
  isAvailable: boolean;
  type?: string; // cuisine/type
}

const FoodItemSchema = new Schema<IFoodItem>(
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

export const FoodItem: Model<IFoodItem> = mongoose.model<IFoodItem>("FoodItem", FoodItemSchema);
