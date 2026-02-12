import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());

app.get("/",(req,res)=>{
    res.send("API is working...");
});

app.use("/api/users", userRoutes);


app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
});


