"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateComplaintStatus = exports.listComplaints = exports.createComplaint = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const Complaint_1 = require("../models/Complaint");
exports.createComplaint = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { sellerId, orderId, message } = req.body;
    const complaint = await Complaint_1.Complaint.create({ customer: req.user.id, seller: sellerId, order: orderId, message });
    res.status(201).json(complaint);
});
exports.listComplaints = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const complaints = await Complaint_1.Complaint.find().populate("customer", "name email");
    res.json(complaints);
});
exports.updateComplaintStatus = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { complaintId } = req.params;
    const { status } = req.body;
    const complaint = await Complaint_1.Complaint.findByIdAndUpdate(complaintId, { status }, { new: true });
    if (!complaint)
        return res.status(404).json({ message: "Complaint not found" });
    res.json(complaint);
});
