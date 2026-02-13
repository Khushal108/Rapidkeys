import express from "express";
import { saveScore } from "../controllers/score.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, saveScore);

export default router;
