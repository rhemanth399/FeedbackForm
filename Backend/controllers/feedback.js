

import Admin from '../models/adminModel.js';
import FeedbackModel from '../models/feedbackModel.js';
import FormModel from '../models/formModel.js';

// Create a new feedback
export const createFeedback = async (req, res) => {
  try {
    const url = await req.file;

    const path = `http://localhost:4000/uploads/${url.filename}`
    console.log(path);
    const { formId, user, responses } = await JSON.parse(req.body.json);
    console.log(responses, "responses", formId, user,);

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
      console.log(response);

      return {
        questionPrompt: question.prompt,
        response: typeof response.response === "object" ? undefined : response.response,
        file: (question.prompt === "File upload") && path ? path : null
      };
    });

    console.log(updatedResponses, "updatedResponses")

    const newFeedback = new FeedbackModel({
      formId,
      user,
      responses: updatedResponses,
      submittedAt: Date.now()
    });

    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    console.log(error, "error");

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
    const admin = await Admin.findById(adminId).select('name email');
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const feedbackUpdateResult = await FeedbackModel.updateOne(
      { _id: feedbackId },
      {
        $set: {
          assignedAdmin: {
            name: admin.name,
            email: admin.email
          },
          status: 'assigned'
        }
      }
    );

    if (feedbackUpdateResult.nModified === 0) {
      return res.status(404).json({ message: 'Feedback not found or already assigned' });
    }

    const adminUpdateResult = await Admin.updateOne(
      { _id: adminId },
      {
        $push: { feedbacksAssigned: feedbackId }
      }
    );

    if (adminUpdateResult.nModified === 0) {
      return res.status(500).json({ message: 'Failed to update admin with assigned feedback' });
    }

    return res.json({
      success: true,
      message: "Feedback assigned to admin successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error assigning feedback",
      error: error.message
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
