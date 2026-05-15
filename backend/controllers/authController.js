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
        
    }catch(error){
       next(error);
    }
}

// @desc Login
// @route POST /api/auth/login
// @access public
export const login = async(req,res,next) =>{

}
// @desc User profile
// @route GET /api/auth/profile
// @access private
export const getProfile = async(req,res,next) =>{

}
// @desc Update User profile
// @route PUT /api/auth/profile
// @access private
export const updateProfile = async(req,res,next) =>{

}
// @desc change password
// @route POST /api/auth/chnage-password
// @access private
export const changePassword = async(req,res,next) =>{

}