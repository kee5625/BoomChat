import cloudinary from "../lib/cloudinary";
import { generateToken } from "../lib/utils";
import User from "../models/User"
import bcrypt from "bcryptjs"

// Signup a new user
export const signup = async (req, res) => {
    const {fullName, email, password, bio} = req.body;  //Request data such as fullname, email, password, bio from frontend app

    try{
        if(!fullName || !email || !password || !bio){
            return res.json({success: false, message: "Missing details"})   //check if all values are filled
        }

        const user = await User.findOne({email});   //check if user already exists in mongo db
        if(user){
            return res.json({success: false, message: "Account already exists"})
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);   //Salt and hash the new user password

        const newUser = await User.create({
            fullName, email, password: hashedPassword, bio
        }); //create new user in MongoDB

        const token = generateToken(newUser._id);   //create jsonwebtoken for new user using generateToken function in (lib/utils.js)

        res.json({success: true, userData: newUser, token, message: "Account created successfully"})    //reply with new user and token

    }catch(error){
        res.json({success: false, message: error.message})
        console.log(error);
    }
}


//Login Controller function
export const login = async(req, res) => {
    try{
        const { email, password} = req.body;
        const userData = await User.findOne({email});

        const isPasswordCorrect = await bcrypt.compare(password, userData.password);

        if(!isPasswordCorrect){
            return res.json({success: false, message: "Invalid credentials"})
        }

        const token = generateToken(userData._id);

        res.json({success: true, userData, token, message: "Login successful"})

    }catch(error){
        res.json({success: false, message: error.message})
        console.log(error);
    }
}


//Controller to check if user is authenticated
export const checkAuth = (req, res) => {
    res.json({success: true, user: req.user});
}

//Controller to update user profile details
export const updateProfile = async(req, res)=>{
    try{
        const {profilePic, bio, fullName} = req.body;

        const userId = req.user._id;
        let updatedUser;

        if(!profilePic){
            await User.findByIdAndUpdate(userId, {bio, fullName}, {new: true})
        }else{
            const upload = await cloudinary.uploader.upload(profilePic);

            updatedUser = await User.findByIdAndUpdate(userId, {profilePic:
                upload.secure_url, bio, fullName
            }, {new: true});
        }
        res.json({success: true, user: updatedUser})

    }catch(error){
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}