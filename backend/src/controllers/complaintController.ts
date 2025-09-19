import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { Complaint } from "../models/Complaint";

export const createComplaint = asyncHandler(async (req: Request, res: Response) => {
  const { sellerId, orderId, message } = req.body as { sellerId?: string; orderId?: string; message: string };
  const complaint = await Complaint.create({ customer: req.user!.id, seller: sellerId, order: orderId, message });
  res.status(201).json(complaint);
});

export const listComplaints = asyncHandler(async (_req: Request, res: Response) => {
  const complaints = await Complaint.find().populate("customer", "name email");
  res.json(complaints);
});

export const updateComplaintStatus = asyncHandler(async (req: Request, res: Response) => {
  const { complaintId } = req.params;
  const { status } = req.body as { status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "REJECTED" };
  const complaint = await Complaint.findByIdAndUpdate(complaintId, { status }, { new: true });
  if (!complaint) return res.status(404).json({ message: "Complaint not found" });
  res.json(complaint);
});
