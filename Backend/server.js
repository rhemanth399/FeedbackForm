import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import 'dotenv/config.js'
import feedbackRouter from "./routes/feedback.js";


//app config
const app=express()
const port=process.env.PORT

//middleware
app.use(express.json())
app.use(cors())


// api endpoints 

app.use("/api",feedbackRouter)


//db connection
connectDB();

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})