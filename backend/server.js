import express from "express"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import connectMongoDB from "./db/connectMongoDB.js"
import cookieParser from 'cookie-parser';
import dotenv from "dotenv"
import {v2 as cloudinary} from "cloudinary" 
dotenv.config()
const app = express()
const PORT = process.env.PORT || 8000
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser());
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

app.listen(PORT, ()=>{
    connectMongoDB()
})