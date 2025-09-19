import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { SellerProfile } from "../models/SellerProfile";
import { FoodItem } from "../models/FoodItem";
import { Order } from "../models/Order";

export const upsertSellerProfile = asyncHandler(async (req: Request, res: Response) => {
  const { shopName, description, address, documents } = req.body as {
    shopName: string;
    description?: string;
    address?: string;
    documents?: string[];
  };
  const userId = req.user!.id;
  const profile = await SellerProfile.findOneAndUpdate(
    { user: userId },
    { shopName, description, address, documents },
    { new: true, upsert: true }
  );
  res.json(profile);
});

export const createFoodItem = asyncHandler(async (req: Request, res: Response) => {
  const { name, description, price, isAvailable, type } = req.body as any;
  const images = (req.files as Express.Multer.File[] | undefined)?.map((f) => `/uploads/${f.filename}`) || [];
  const item = await FoodItem.create({ seller: req.user!.id, name, description, price, isAvailable, type, images });
  res.status(201).json(item);
});

export const updateFoodItem = asyncHandler(async (req: Request, res: Response) => {
  const { itemId } = req.params;
  const updates = req.body as any;
  const images = (req.files as Express.Multer.File[] | undefined)?.map((f) => `/uploads/${f.filename}`);
  if (images && images.length) updates.$push = { images: { $each: images } };
  const item = await FoodItem.findOneAndUpdate({ _id: itemId, seller: req.user!.id }, updates, { new: true });
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json(item);
});

export const deleteFoodItem = asyncHandler(async (req: Request, res: Response) => {
  const { itemId } = req.params;
  const item = await FoodItem.findOneAndDelete({ _id: itemId, seller: req.user!.id });
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json({ success: true });
});

export const listMyOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find({ seller: req.user!.id }).populate("items.foodItem");
  res.json(orders);
});

export const updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const { status } = req.body as { status: "ACCEPTED" | "REJECTED" | "COMPLETED" };
  const order = await Order.findOneAndUpdate({ _id: orderId, seller: req.user!.id }, { status }, { new: true });
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
});
