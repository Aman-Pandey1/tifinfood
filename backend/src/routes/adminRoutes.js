import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import { approveSeller, blockUser, dashboardStats, listPendingSellers, rejectSeller, unblockUser } from "../controllers/adminController.js";

const router = Router();

router.use(authenticate, authorize(["ADMIN"]));

router.get("/pending-sellers", listPendingSellers);
router.post("/approve-seller/:sellerId", approveSeller);
router.post("/reject-seller/:sellerId", rejectSeller);
router.post("/block-user/:userId", blockUser);
router.post("/unblock-user/:userId", unblockUser);
router.get("/dashboard", dashboardStats);

export default router;
