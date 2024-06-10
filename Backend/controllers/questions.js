import Question from "../models/questionModel.js";

const addQuestions = async (req, res) => {
    const { questions } = req.body;
    try {
        const newQuestionDoc = new Question({ questions });
        await newQuestionDoc.save();
        res.status(201).json(newQuestionDoc);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const retrievingFeedback = async(req,res)=>{
    try {
        const response = await Question.find({})
        res.json({success:true,data:response})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
    
}

export { addQuestions ,retrievingFeedback };
