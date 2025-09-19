import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/User";

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user!.id).select("name email role isBlocked location phone address");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

export const updateLocation = asyncHandler(async (req: Request, res: Response) => {
  const { lat, lng } = req.body as { lat: number; lng: number };
  if (typeof lat !== "number" || typeof lng !== "number") {
    return res.status(400).json({ message: "lat and lng are required numbers" });
  }
  const user = await User.findByIdAndUpdate(
    req.user!.id,
    { location: { type: "Point", coordinates: [lng, lat] } },
    { new: true }
  ).select("name email role location");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});
