import express from 'express';
import { ExpressValidator } from 'express-validator';
import {
    register ,
    login,
    getProfile,
    updateProfile,
    changePassword
} from '../controllers/authController.js';
import protect from '../middleware/auth.js';

const router = express.Router();
//Validation middleware
const registerValidation =[
    body('username').trim().isLength({min: 3}).withMessage('Username must be at least 3 chararcter'),
    body('email').isEmail().normalizeEmail().withMessage('Please Provide a valid email'),
    body('password').isLength({min: 6}).withMessage('Password must be of 6 character')
]
const loginValidation =[
    body('email').isEmail().normalizeEmail().withMessage('Please Provide Valid Email'),
    body('password').isEmpty().withMessage('Password is Required')
];
//public routes 
router.post('/register',registerValidation,register);
router.post('/login',loginValidation,login);
//protected routes 
router.get('/profile',protect, getProfile);
router.put('/profile',protect, updateProfile);
router.post('/change-password',protect, changePassword);
export default router;