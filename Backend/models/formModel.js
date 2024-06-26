import mongoose from "mongoose";
import generateQRCodeMiddleware from "../middlewares/generateQRCodeMiddleware.js";
const questionSchema = new mongoose.Schema({
    type: String,
    prompt: String,
    options: [String]
  });


  const formSchema = new mongoose.Schema({
    title: String,
    questions: [questionSchema],
    submittedAt: { type: Date, default: Date.now },
    qrCode: String, 
  });

  
  const FormModel = mongoose.model('Form', formSchema);

  export default FormModel