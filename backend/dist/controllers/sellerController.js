"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.listMyOrders = exports.deleteFoodItem = exports.updateFoodItem = exports.createFoodItem = exports.upsertSellerProfile = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const SellerProfile_1 = require("../models/SellerProfile");
const FoodItem_1 = require("../models/FoodItem");
const Order_1 = require("../models/Order");
exports.upsertSellerProfile = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { shopName, description, address, documents } = req.body;
    const userId = req.user.id;
    const profile = await SellerProfile_1.SellerProfile.findOneAndUpdate({ user: userId }, { shopName, description, address, documents }, { new: true, upsert: true });
    res.json(profile);
});
exports.createFoodItem = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { name, description, price, isAvailable, type } = req.body;
    const images = req.files?.map((f) => `/uploads/${f.filename}`) || [];
    const item = await FoodItem_1.FoodItem.create({ seller: req.user.id, name, description, price, isAvailable, type, images });
    res.status(201).json(item);
});
exports.updateFoodItem = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { itemId } = req.params;
    const updates = req.body;
    const images = req.files?.map((f) => `/uploads/${f.filename}`);
    if (images && images.length)
        updates.$push = { images: { $each: images } };
    const item = await FoodItem_1.FoodItem.findOneAndUpdate({ _id: itemId, seller: req.user.id }, updates, { new: true });
    if (!item)
        return res.status(404).json({ message: "Item not found" });
    res.json(item);
});
exports.deleteFoodItem = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { itemId } = req.params;
    const item = await FoodItem_1.FoodItem.findOneAndDelete({ _id: itemId, seller: req.user.id });
    if (!item)
        return res.status(404).json({ message: "Item not found" });
    res.json({ success: true });
});
exports.listMyOrders = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const orders = await Order_1.Order.find({ seller: req.user.id }).populate("items.foodItem");
    res.json(orders);
});
exports.updateOrderStatus = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order_1.Order.findOneAndUpdate({ _id: orderId, seller: req.user.id }, { status }, { new: true });
    if (!order)
        return res.status(404).json({ message: "Order not found" });
    res.json(order);
});
