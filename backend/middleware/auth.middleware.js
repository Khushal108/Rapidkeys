import jwt from "jsonwebtoken";
import User from "../src/models/user.model";   

export const protect = async(req,res,next)=>{
    try {
        const token = req.cookie.jwt;

        if(!token){
            return res.status(400).json({message: "Unauthorized: token not provided"});
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);


        const user = await User.findById(decode.userId).select("-password");
        
        if(!user){
            return res.status(401).json({message: "User not found"});
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({message: error.message});
    }
};