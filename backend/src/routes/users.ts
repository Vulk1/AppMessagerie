import express from "express";
import { getCurrentUserProfile, getUserPreview, getUserProfile } from "../controllers/users.controller.js";
const router = express.Router();


router.get("/me", getCurrentUserProfile);
router.get("/:userId", getUserPreview);
router.get("/:userId/profile", getUserProfile);


export default router;