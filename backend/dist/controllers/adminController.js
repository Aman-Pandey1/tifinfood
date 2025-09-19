"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardStats = exports.unblockUser = exports.blockUser = exports.rejectSeller = exports.approveSeller = exports.listPendingSellers = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const SellerProfile_1 = require("../models/SellerProfile");
const User_1 = require("../models/User");
const Order_1 = require("../models/Order");
exports.listPendingSellers = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const sellers = await SellerProfile_1.SellerProfile.find({ isApproved: false }).populate("user", "name email");
    res.json(sellers);
});
exports.approveSeller = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { sellerId } = req.params;
    const seller = await SellerProfile_1.SellerProfile.findByIdAndUpdate(sellerId, { isApproved: true }, { new: true });
    if (!seller)
        return res.status(404).json({ message: "Seller not found" });
    res.json(seller);
});
exports.rejectSeller = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { sellerId } = req.params;
    const seller = await SellerProfile_1.SellerProfile.findByIdAndUpdate(sellerId, { isApproved: false }, { new: true });
    if (!seller)
        return res.status(404).json({ message: "Seller not found" });
    res.json(seller);
});
exports.blockUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { userId } = req.params;
    const user = await User_1.User.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
    if (!user)
        return res.status(404).json({ message: "User not found" });
    res.json(user);
});
exports.unblockUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { userId } = req.params;
    const user = await User_1.User.findByIdAndUpdate(userId, { isBlocked: false }, { new: true });
    if (!user)
        return res.status(404).json({ message: "User not found" });
    res.json(user);
});
exports.dashboardStats = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const [numSellers, numCustomers, numOrders] = await Promise.all([
        User_1.User.countDocuments({ role: "SELLER" }),
        User_1.User.countDocuments({ role: "CUSTOMER" }),
        Order_1.Order.countDocuments(),
    ]);
    res.json({ numSellers, numCustomers, numOrders });
});
