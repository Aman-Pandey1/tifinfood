import mongoose, { Schema, Document, Model, Types } from "mongoose";

export type OrderStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETED" | "CANCELLED";

export interface IOrderItem {
  foodItem: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  customer: Types.ObjectId;
  seller: Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentId?: string;
}

const OrderItemSchema = new Schema<IOrderItem>({
  foodItem: { type: Schema.Types.ObjectId, ref: "FoodItem", required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
});

const OrderSchema = new Schema<IOrder>(
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

export const Order: Model<IOrder> = mongoose.model<IOrder>("Order", OrderSchema);
