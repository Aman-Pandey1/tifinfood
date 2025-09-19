import mongoose, { Schema } from "mongoose";

const OrderItemSchema = new Schema({
  foodItem: { type: Schema.Types.ObjectId, ref: "FoodItem", required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
});

const OrderSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [OrderItemSchema], required: true },
    totalAmount: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ["PENDING", "ACCEPTED", "REJECTED", "COMPLETED", "CANCELLED"], default: "PENDING" },
    paymentId: String,
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", OrderSchema);
