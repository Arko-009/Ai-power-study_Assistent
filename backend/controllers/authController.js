import jwt from "jsonwebtoken";
import User from "../models/User.js";

//genrate JWT token 
const genrateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE || "7d",
    });
};

// @desc Register 
// @route POST /api/auth/register
// @access public

export const register = async (req,res,next) => {
    try{
        const{username,email,password} = req.body;
        //check if user exist 
        const userExists = await User.findOne({$or:[{email}] });
        if(userExists){
            return res.status(400).json({
                success:false,
                error:
                userExists.email === email ?
                "Email already registered":
                "User already exist with this username",
                statusCode:400,
            });
        }
        //create user 
         const user = await User.create({
            username,
            email,
            password
         });
         //Generate token
         const token = genrateToken(user._id);

         res.status(201).json({
            success:true,
            data:{
                user:{
                    id:user._id,
                    username:user.username,
                    email:user.email,
                    profileImage:user.profileImage,
                    createdAt:user.createdAt
                },
                token,
            },
            message:"User registerd successfully",
         });
    }catch(error){
       next(error);
    }
}

// @desc Login
// @route POST /api/auth/login
// @access public
export const login = async(req,res,next) =>{
    try{
        const{email,password} = req.body;
        //Validate input 
        if(!email || !password){
            return res.status(400).json({
                success:false,
                error:"Please provide email and password",
                statusCode:400,
            });
        }
        // check for user (include password for comparision)
        const user = await User.findOne({email}).select('+password');
        if(!user){
            return res.status(401).json({
                success:false,
                error:"Invalid creadentials",
                statusCode:401,
            });
        }
        //check password
        const isMatch = await user.matchPassword(password);
        if(!isMatch){
            return res.status(401).json({
                success:false,
                error:"Invalid creadentials",
                statusCode:401,
            });
        }

        //Generate token
        const token = genrateToken(user._id);
        res.status(200).json({
            success:true,
            user:{
                id:user._id,
                usename:user.username,
                email:user.email,
                profileImage:user.profileImage,
            },
            token,
            message:"User logged in successfully",
        });
    }catch(error){
       next(error);
    }
}
// @desc User profile
// @route GET /api/auth/profile
// @access private
export const getProfile = async(req,res,next) =>{
    try{
        const user =await User.findById(req.user._id);
        res.status(200).json({
            success:true,
            data:{
                id:user._id,
                username:user.username,
                email:user.email,
                profileImage:user.profileImage,
                createdAt:user.createdAt,
                updateAt:user.updateAt,
            },
        });
        
    }catch(error){
       next(error);
    }
}
// @desc Update User profile
// @route PUT /api/auth/profile
// @access private
export const updateProfile = async(req,res,next) =>{
    try{
        
        const{username,email,profileImage} = req.body;
        const user = await User.findById(req.user._id);
        if(username) user.username = username;
        if(email) user.email = email;
        if(profileImage) user.profileImage = profileImage;
        await user.save();
        res.status(200).json({
            success:true,
            data:{
                id:user._id,
                username:user.username,
                email:user.email,
                profileImage:user.profileImage,
            },
            message:"Profile updated successfully"
        });
    }catch(error){
       next(error);
    }
}
// @desc change password
// @route POST /api/auth/chnage-password
// @access private
export const changePassword = async(req,res,next) =>{
    try{
        const{currentPassword,newPassword} = req.body; 
        if(!currentPassword || !newPassword){
            return res.status(400).json({
                success:false,
                error:"Please provide current password and new password",
                statusCode:400,
            });
        }
        //check crrent password
        const user = await user.matchPassword(currentPassword);
        if(!isMatch){
           return res.status(401).json({
                success:false,
                error:"Current Password is incorrect",
                statusCode:401,
            });
        }
        //update password
        user.password = newPassword;
        await user.save();
        res.status(200).json({
            success:true,
            message:"Password changed successfully",
        });
    }catch(error){
       next(error);
    }
}