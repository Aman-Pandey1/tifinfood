import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth";
import { addReview, listMenuForSeller, myOrders, nearbySellers, placeOrder } from "../controllers/customerController";

const router = Router();

router.use(authenticate, authorize(["CUSTOMER"]));

router.get("/nearby-sellers", nearbySellers);
router.get("/seller/:sellerId/menu", listMenuForSeller);
router.post("/orders", placeOrder);
router.get("/orders", myOrders);
router.post("/reviews", addReview);

export default router;
