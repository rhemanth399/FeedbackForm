import mongoose from "mongoose";
import FormModel from "./formModel.js";

const responseSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  response: String
});

const feedbackSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: 'FormModel', required: true },
  user: {
    name: String,
    email: String,
    phone:String
  },                                                                                                                                              
  responses: [responseSchema],
  submittedAt: { type: Date, default: Date.now }
});

const FeedbackModel = mongoose.model('Feedback', feedbackSchema);

export default FeedbackModel;
