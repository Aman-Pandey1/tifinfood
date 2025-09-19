import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth";
import { createComplaint, listComplaints, updateComplaintStatus } from "../controllers/complaintController";

const router = Router();

router.post("/", authenticate, authorize(["CUSTOMER"]), createComplaint);

router.get("/", authenticate, authorize(["ADMIN"]), listComplaints);
router.post("/:complaintId/status", authenticate, authorize(["ADMIN"]), updateComplaintStatus);

export default router;
