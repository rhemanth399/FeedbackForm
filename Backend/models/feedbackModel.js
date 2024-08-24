import mongoose from "mongoose";
import SendFeedbackNotification from "../services/SendFeedbackNotification";
const responseSchema = new mongoose.Schema({
  questionPrompt: { type: String, required: true },
  response: String ,
  file: String,
  questionType: { type: String }
});

const assignedAdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }
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
 assignedAdmin: assignedAdminSchema,
 status: { type: String, enum: ['pending', 'assigned', 'resolved'], default: 'pending' },
 comment:String,
 resolutionComment: String,
 adminSubmittedDate:{type:Date,default:Date.now}
});


feedbackSchema.post('save', async function(doc, next) {
  try{
  await SendFeedbackNotification(doc._id);
  }
  catch(err){
    console.log(err);
    console.error("Error sending feedback notification:", error);
    next(err)
  }
  next();
});

const FeedbackModel = mongoose.model('Feedback', feedbackSchema);

export default FeedbackModel;
