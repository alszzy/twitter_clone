import { protectRoute } from "../middleware/protectRoute.js";
import express from "express";
import { getUserProfile, updateUserProfile } from "../controller/user.controller.js";

const router = express.Router();

router.get("/profile/:username", protectRoute, getUserProfile)
router.post("/update", protectRoute, updateUserProfile)

/*
Extension: Follow a user
router.post("/follow/:userId", protectRoute, followUser)
*/

export default router