import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from "url";
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middleware/errorHandler.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
//connect to mongoDb
connectDB();
//middleware to handle cors - 
app.use(cors({
    origin: "*" ,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
//Folder for uploads
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
//Routes
app.use('api/auth',authRoutes);

app.use(errorHandler);
//404 handleer -
app.use((req ,res)=>{
    res.status(404).json({
        success: false,
        error: "Route not found",
        statusCode:404
    });
})
//Start Server 
const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`server running on PORT ${process.env.PORT}`);
});

process.on('unhandledRejection',(err)=>{
    console.error(`server Error : ${err.message}`);
    process.exit(1);
});

