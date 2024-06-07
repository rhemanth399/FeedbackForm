import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    questions: [{ type: String, required: true }]
});

const Question = mongoose.model('Question', questionSchema);

export default Question;
