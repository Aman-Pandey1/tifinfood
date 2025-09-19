import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { getMe, updateLocation } from "../controllers/userController";

const router = Router();

router.use(authenticate);
router.get("/me", getMe);
router.post("/location", updateLocation);

export default router;
