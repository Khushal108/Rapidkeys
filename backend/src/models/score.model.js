import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        wpm:{
            type: Number,
            required: true
        },
        accuracy:{
            type: Number,
            required: true
        }
    },
    {timestamps: true}
);

const Score = mongoose.model("Score", scoreSchema);

export default Score;