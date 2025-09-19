"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReview = exports.myOrders = exports.placeOrder = exports.listMenuForSeller = exports.nearbySellers = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const User_1 = require("../models/User");
const FoodItem_1 = require("../models/FoodItem");
const Order_1 = require("../models/Order");
const Review_1 = require("../models/Review");
exports.nearbySellers = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { lng, lat, radiusKm = 5 } = req.query;
    const longitude = parseFloat(lng);
    const latitude = parseFloat(lat);
    const meters = Number(radiusKm) * 1000;
    const sellers = await User_1.User.find({
        role: "SELLER",
        location: {
            $near: {
                $geometry: { type: "Point", coordinates: [longitude, latitude] },
                $maxDistance: meters,
            },
        },
    }).select("name email location");
    res.json(sellers);
});
exports.listMenuForSeller = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { sellerId } = req.params;
    const items = await FoodItem_1.FoodItem.find({ seller: sellerId, isAvailable: true });
    res.json(items);
});
exports.placeOrder = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { sellerId, items } = req.body;
    const totalAmount = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
    const order = await Order_1.Order.create({ customer: req.user.id, seller: sellerId, items, totalAmount, status: "PENDING" });
    res.status(201).json(order);
});
exports.myOrders = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const orders = await Order_1.Order.find({ customer: req.user.id }).populate("items.foodItem");
    res.json(orders);
});
exports.addReview = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { sellerId, rating, comment } = req.body;
    const review = await Review_1.Review.create({ customer: req.user.id, seller: sellerId, rating, comment });
    res.status(201).json(review);
});
