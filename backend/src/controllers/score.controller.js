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