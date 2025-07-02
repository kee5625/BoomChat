import User from "../models/User";
import JWT from "jsonwebtoken"

//Middleware to protect routes
export const protectRoute = async (req, res, next) => {
    try{
        const token = req.headers.token;    //get token of the user

        const decoded = JWT.verify(token, process.env.JWT_SECRET);  //decode token

        const user = await User.findById(decoded.userId).select("-password"); //extract userId from decoded token, and removing password; returns true/false

        if(!user){
            return res.json({success: false, message: "User not found"});
        }

        req.user = user;
        next();
    }catch(error){
        res.json({success: false, message: error.message});
        console.log(error);
    }
}