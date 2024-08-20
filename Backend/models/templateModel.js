import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  type: String,
  prompt: String,
  options: [String]
});

const templateSchema = new mongoose.Schema({
  title: String,
  questions: [questionSchema],
  submittedAt: { type: Date, default: Date.now },
  qrCode: String,
});


const Template = mongoose.model('Template', templateSchema);

export default Template;