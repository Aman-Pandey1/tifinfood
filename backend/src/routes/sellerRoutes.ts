import { Router } from "express";
import multer from "multer";
import path from "path";
import { authenticate, authorize } from "../middleware/auth";
import { createFoodItem, deleteFoodItem, listMyOrders, updateFoodItem, updateOrderStatus, upsertSellerProfile } from "../controllers/sellerController";

const router = Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, path.join(process.cwd(), "uploads")),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`),
});
const upload = multer({ storage });

router.use(authenticate, authorize(["SELLER"]));

router.post("/profile", upsertSellerProfile);
router.post("/food-items", upload.array("images", 5), createFoodItem);
router.put("/food-items/:itemId", upload.array("images", 5), updateFoodItem);
router.delete("/food-items/:itemId", deleteFoodItem);

router.get("/orders", listMyOrders);
router.post("/orders/:orderId/status", updateOrderStatus);

export default router;
