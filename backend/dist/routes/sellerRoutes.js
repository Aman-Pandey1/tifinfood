"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const auth_1 = require("../middleware/auth");
const sellerController_1 = require("../controllers/sellerController");
const router = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => cb(null, path_1.default.join(process.cwd(), "uploads")),
    filename: (_req, file, cb) => cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`),
});
const upload = (0, multer_1.default)({ storage });
router.use(auth_1.authenticate, (0, auth_1.authorize)(["SELLER"]));
router.post("/profile", sellerController_1.upsertSellerProfile);
router.post("/food-items", upload.array("images", 5), sellerController_1.createFoodItem);
router.put("/food-items/:itemId", upload.array("images", 5), sellerController_1.updateFoodItem);
router.delete("/food-items/:itemId", sellerController_1.deleteFoodItem);
router.get("/orders", sellerController_1.listMyOrders);
router.post("/orders/:orderId/status", sellerController_1.updateOrderStatus);
exports.default = router;
