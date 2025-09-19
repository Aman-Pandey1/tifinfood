import { asyncHandler } from "../utils/asyncHandler.js";
import { SellerProfile } from "../models/SellerProfile.js";
import { FoodItem } from "../models/FoodItem.js";
import { Order } from "../models/Order.js";

export const upsertSellerProfile = asyncHandler(async (req, res) => {
  const { shopName, description, address, documents } = req.body;
  const userId = req.user.id;
  const profile = await SellerProfile.findOneAndUpdate(
    { user: userId },
    { shopName, description, address, documents },
    { new: true, upsert: true }
  );
  res.json(profile);
});

export const createFoodItem = asyncHandler(async (req, res) => {
  const { name, description, price, isAvailable, type } = req.body;
  const images = (req.files?.map((f) => `/uploads/${f.filename}`)) || [];
  const item = await FoodItem.create({ seller: req.user.id, name, description, price, isAvailable, type, images });
  res.status(201).json(item);
});

export const updateFoodItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const updates = req.body;
  const images = (req.files?.map((f) => `/uploads/${f.filename}`));
  if (images && images.length) updates.$push = { images: { $each: images } };
  const item = await FoodItem.findOneAndUpdate({ _id: itemId, seller: req.user.id }, updates, { new: true });
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json(item);
});

export const deleteFoodItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const item = await FoodItem.findOneAndDelete({ _id: itemId, seller: req.user.id });
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json({ success: true });
});

export const listMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ seller: req.user.id }).populate("items.foodItem");
  res.json(orders);
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const order = await Order.findOneAndUpdate({ _id: orderId, seller: req.user.id }, { status }, { new: true });
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
});
