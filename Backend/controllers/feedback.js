import Admin from '../models/adminModel.js';
import FeedbackModel from '../models/feedbackModel.js';
import FormModel from '../models/formModel.js';

// Create a new feedback
export const createFeedback = async (req, res) => {
  try {
    const { formId, user, responses } = req.body;
    const file = responses;

    console.log('File:', file);

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

    // Add the file path to the first response and include question prompts
    const updatedResponses = responses.map((response, index) => {
      const question = form.questions.id(response.questionId);
      return {
        questionPrompt: question.prompt,
        response: response.response,
        file: index === 0 && file ? file.filename : null
      };
    });

    const newFeedback = new FeedbackModel({
      formId,
      user,
      responses: updatedResponses,
      submittedAt: Date.now()
    });

    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve list of feedback
export const RetrievingListOfFeedback = async (req, res) => {
  try {
    const feedback = await FeedbackModel.find()
    res.json({ success: true, message: feedback });
  } catch (error) {
    res.json({ success: false, message: "Error", error });
  }
};

// Assign feedback task to admin
export const feedbackTaskAssign = async (req, res) => {
  const { feedbackId } = req.params;
  const { adminId } = req.body;
  try {
    const feedback = await FeedbackModel.findById(feedbackId);
    const admin = await Admin.findById(adminId).select('name email');
    if (!feedback || !admin) {
      return res.status(404).json({ message: 'Feedback or Admin not found' });
    }
    feedback.assignedAdmin = {
      name: admin.name,
      email: admin.email
    };
    feedback.status = 'assigned';
    await feedback.save();
    admin.feedbacksAssigned.push(feedbackId);
    await admin.save();
    res.json({
      success: true,
      message: "Feedback assigned to admin successfully"
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error assigning feedback",
      error
    });
  }
};

// Resolve feedback task
export const feedbackTaskResolve = async (req, res) => {
  const { feedbackId } = req.params;
  const { resolutionComment } = req.body;

  try {
    const feedback = await FeedbackModel.findById(feedbackId);
    if (!feedback) {
      return res.json({
        success: false,
        message: "Feedback Not Found"
      });
    }
    feedback.status = 'resolved';
    feedback.resolutionComment = resolutionComment;
    await feedback.save();
    res.json({
      success: true,
      message: "Feedback resolved successfully"
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error resolving feedback",
      error
    });
  }
};
