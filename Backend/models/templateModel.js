import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  type: String,
  prompt: String,
  options: [String]
});

const templateSchema = new mongoose.Schema({
  title: String,
  questions: [questionSchema]
});


const Template = mongoose.model('Template', templateSchema);

export default Template;