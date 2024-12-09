import express from "express"
import authRoutes from "./routes/auth.routes.js"
import connectMongoDB from "./db/connectMongoDB.js"
import dotenv from "dotenv"
dotenv.config()
const app = express()
const PORT = process.env.PORT || 8000

app.use('/api/auth', authRoutes)

app.listen(PORT, ()=>{
    connectMongoDB()
})