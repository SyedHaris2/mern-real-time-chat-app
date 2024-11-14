import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUserforSidebar } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUserforSidebar);
export default router;
