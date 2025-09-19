import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { SellerProfile } from "../models/SellerProfile";
import { User } from "../models/User";
import { Order } from "../models/Order";

export const listPendingSellers = asyncHandler(async (_req: Request, res: Response) => {
  const sellers = await SellerProfile.find({ isApproved: false }).populate("user", "name email");
  res.json(sellers);
});

export const approveSeller = asyncHandler(async (req: Request, res: Response) => {
  const { sellerId } = req.params;
  const seller = await SellerProfile.findByIdAndUpdate(sellerId, { isApproved: true }, { new: true });
  if (!seller) return res.status(404).json({ message: "Seller not found" });
  res.json(seller);
});

export const rejectSeller = asyncHandler(async (req: Request, res: Response) => {
  const { sellerId } = req.params;
  const seller = await SellerProfile.findByIdAndUpdate(sellerId, { isApproved: false }, { new: true });
  if (!seller) return res.status(404).json({ message: "Seller not found" });
  res.json(seller);
});

export const blockUser = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await User.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

export const unblockUser = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await User.findByIdAndUpdate(userId, { isBlocked: false }, { new: true });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

export const dashboardStats = asyncHandler(async (_req: Request, res: Response) => {
  const [numSellers, numCustomers, numOrders] = await Promise.all([
    User.countDocuments({ role: "SELLER" }),
    User.countDocuments({ role: "CUSTOMER" }),
    Order.countDocuments(),
  ]);
  res.json({ numSellers, numCustomers, numOrders });
});
