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
        
    }catch(error){
       next(error);
    }
}
// @desc User profile
// @route GET /api/auth/profile
// @access private
export const getProfile = async(req,res,next) =>{
    try{
        
    }catch(error){
       next(error);
    }
}
// @desc Update User profile
// @route PUT /api/auth/profile
// @access private
export const updateProfile = async(req,res,next) =>{
    try{
        
    }catch(error){
       next(error);
    }
}
// @desc change password
// @route POST /api/auth/chnage-password
// @access private
export const changePassword = async(req,res,next) =>{
    try{
        
    }catch(error){
       next(error);
    }
}