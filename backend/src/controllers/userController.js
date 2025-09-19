import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/User.js";

export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("name email role isBlocked location phone address");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

export const updateLocation = asyncHandler(async (req, res) => {
  const { lat, lng } = req.body;
  if (typeof lat !== "number" || typeof lng !== "number") {
    return res.status(400).json({ message: "lat and lng are required numbers" });
  }
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { location: { type: "Point", coordinates: [lng, lat] } },
    { new: true }
  ).select("name email role location");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});
