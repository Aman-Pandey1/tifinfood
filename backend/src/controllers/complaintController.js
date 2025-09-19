import { asyncHandler } from "../utils/asyncHandler.js";
import { Complaint } from "../models/Complaint.js";

export const createComplaint = asyncHandler(async (req, res) => {
  const { sellerId, orderId, message } = req.body;
  const complaint = await Complaint.create({ customer: req.user.id, seller: sellerId, order: orderId, message });
  res.status(201).json(complaint);
});

export const listComplaints = asyncHandler(async (_req, res) => {
  const complaints = await Complaint.find().populate("customer", "name email");
  res.json(complaints);
});

export const updateComplaintStatus = asyncHandler(async (req, res) => {
  const { complaintId } = req.params;
  const { status } = req.body;
  const complaint = await Complaint.findByIdAndUpdate(complaintId, { status }, { new: true });
  if (!complaint) return res.status(404).json({ message: "Complaint not found" });
  res.json(complaint);
});
