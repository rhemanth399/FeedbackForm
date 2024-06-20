import mongoose from "mongoose";


const feedbackSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
  answers: [{
    question: { type: String, required: false },
    answer: { type: String, required: false }
  }],
  customerDetails: {
    name: String,
    mobile: String,
    email: String
  }
}, { timestamps: true });

const feedbackModel = mongoose.model("feedback",feedbackSchema)

export default feedbackModel