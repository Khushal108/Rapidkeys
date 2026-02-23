import Score from "../models/score.model.js";

export const saveScore = async (req,res)=>{
    try {
        const {wpm , accuracy} = req.body;

        if(!wpm || !accuracy){
            return res.status(401).json({message: "Wpm and accuracy required"});
        }

        const score = await Score.create({
            userId: req.user._id,
            wpm,
            accuracy
        });

        res.status(201).json(score);

    } catch (error) {
        return res.status(401).json({message: error.message});
    }
};

export const getScoreHistory = async(req,res)=>{
    try {
        const score = await Score.find({userId: req.user._id}).sort({createdAt:-1});
        return res.status(200).json(score);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const getLeaderboard = async (req,res)=>{
    try {
        const leaderboard = await Score.find()
        .sort({wpm:-1})
        .limit(10)
        .populate("userId","name");

        res.status(200).json(leaderboard);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};