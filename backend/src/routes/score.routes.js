import express from "express";
import { saveScore, getScoreHistory, getLeaderboard } from "../controllers/score.controller.js";
import { protect } from "../middleware/auth.middleware.js"

const router = express.Router();

router.post("/", protect, saveScore);
router.get("/history", protect, getScoreHistory);
router.get("/leaderboard", getLeaderboard);

export default router;
