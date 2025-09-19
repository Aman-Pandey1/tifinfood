import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/User.js";
import { FoodItem } from "../models/FoodItem.js";
import { Order } from "../models/Order.js";
import { Review } from "../models/Review.js";

export const nearbySellers = asyncHandler(async (req, res) => {
  const { lng, lat, radiusKm = 5 } = req.query;
  const longitude = parseFloat(lng);
  const latitude = parseFloat(lat);
  const meters = Number(radiusKm) * 1000;
  const sellers = await User.find({
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

export const listMenuForSeller = asyncHandler(async (req, res) => {
  const { sellerId } = req.params;
  const items = await FoodItem.find({ seller: sellerId, isAvailable: true });
  res.json(items);
});

export const placeOrder = asyncHandler(async (req, res) => {
  const { sellerId, items } = req.body;
  const totalAmount = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const order = await Order.create({ customer: req.user.id, seller: sellerId, items, totalAmount, status: "PENDING" });
  res.status(201).json(order);
});

export const myOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ customer: req.user.id }).populate("items.foodItem");
  res.json(orders);
});

export const addReview = asyncHandler(async (req, res) => {
  const { sellerId, rating, comment } = req.body;
  const review = await Review.create({ customer: req.user.id, seller: sellerId, rating, comment });
  res.status(201).json(review);
});
