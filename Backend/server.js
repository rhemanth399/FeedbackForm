import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import 'dotenv/config.js'
import formRouter from "./routes/form.js";
import templateRouter from "./routes/templates.js";
import adminRouter from "./routes/admin.js";


//app config
const app=express()
const port=process.env.PORT

//middleware
app.use(express.json())
app.use(cors())


// api endpoints 

app.use("/api",formRouter)



app.use("/api",templateRouter)

app.use("/api",adminRouter)



//db connection
connectDB();

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})