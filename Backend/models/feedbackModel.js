import mongoose from "mongoose";

const responseSchema = new mongoose.Schema({
  questionPrompt: { type: String, required: true },
  response: String 
});

const feedbackSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: 'FormModel', required: true },
  user: {
    name: String,
    email: String,
    phone: String
  },
  responses: [responseSchema],
  submittedAt: { type: Date, default: Date.now },
 assignedAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
 status: { type: String, enum: ['pending', 'assigned', 'resolved'], default: 'pending' },
 resolutionComment: String
});

const FeedbackModel = mongoose.model('Feedback', feedbackSchema);

export default FeedbackModel;
