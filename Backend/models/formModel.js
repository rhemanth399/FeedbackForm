import mongoose from "mongoose";


const questionSchema = new mongoose.Schema({
    type: String,
    prompt: String,
    options: [String]
  });


  const formSchema = new mongoose.Schema({
    title: String,
    questions: [questionSchema]
  });

  const FormModel = mongoose.model('Form', formSchema);

  export default FormModel