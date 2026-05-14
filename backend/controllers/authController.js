import jwt from "jsonwebtoken";
import User from "../models/User.js";

//genrate JWT token 
const genrateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        
    });
}