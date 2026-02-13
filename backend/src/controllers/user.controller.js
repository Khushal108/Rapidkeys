import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signupUser = async (req,res) =>{
    try {
        const {email, name, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            email,
            name,
            password: hashedPassword
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });


    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const loginUser = async(req,res)=>{
    try {
        const {email ,password} = req.body;

        if(!email || !password){
            return res.status(400).json({message:"Both fields are required"});
        }

        const user = await User.findOne({email});
        
        if(!user){
            return res.status(400).json({message: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({message: "Invalid password"});
        }

        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

        res.cookie("jwt",token,{
            httpOnly: true,
            sameSite: "strict",
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: "Login successful",
            _id: user._id,
            name: user.name,
            email: user.email
        });


    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};