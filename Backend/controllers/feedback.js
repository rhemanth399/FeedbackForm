import FeedbackModel from '../models/feedbackModel.js';
import FormModel from '../models/formModel.js';

// Create a new feedback
export const createFeedback = async (req, res) => {
  try {
    const { formId, user, responses } = req.body;

    // Validate that the form exists
    const form = await FormModel.findById(formId);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    // Validate that responses match the form questions
    const formQuestionIds = form.questions.map(q => q._id.toString());
    const invalidResponses = responses.filter(r => !formQuestionIds.includes(r.questionId));

    if (invalidResponses.length > 0) {
      return res.status(400).json({ message: 'Invalid question ID(s) in responses' });
    }

    const newFeedback = new FeedbackModel({
      formId,
      user,
      responses
    });

    const savedFeedback = await newFeedback.save();

    res.status(201).json(savedFeedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const RetrievingListOfFeedback = async(req,res)=>{

  const feedback = await FeedbackModel.find();
  if(feedback){
    res.json({success:true,message:feedback})
  }
  else{
    res.json({success:false,message:"Error"})
  }
}
