import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import { createComplaint, listComplaints, updateComplaintStatus } from "../controllers/complaintController.js";

const router = Router();

router.post("/", authenticate, authorize(["CUSTOMER"]), createComplaint);

router.get("/", authenticate, authorize(["ADMIN"]), listComplaints);
router.post("/:complaintId/status", authenticate, authorize(["ADMIN"]), updateComplaintStatus);

export default router;
