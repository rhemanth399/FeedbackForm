import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    rating:{type:String,required:false},
    comment:{type:String,required:false},
    yesNo:{type:String,required:false},
    name:{type:String,required:false}
})

const feedbackModel = mongoose.models.feedback || mongoose.model("feedback",feedbackSchema)

export default feedbackModel;