

import Admin from '../models/adminModel.js';
import FeedbackModel from '../models/feedbackModel.js';
import FormModel from '../models/formModel.js';
import { getFeedbackStatistics } from '../services/getFeedbackStatistics.js';

// Create a new feedback
export const createFeedback = async (req, res) => {
  try {
    // Check if a file was uploaded
    const fileUrl = req.file ? `https://feedbackform-backend-ao0d.onrender.com/uploads/${req.file.filename}` : null;

    // Parse the form data
    const { formId, user, responses } = JSON.parse(req.body.json);

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

    // Add the file path to the corresponding response if applicable
    const updatedResponses = responses.map((response) => {
      const question = form.questions.id(response.questionId);
      console.log(response);

      return {
        questionPrompt: question.prompt,
        questionType: question.type,
        response: question.type === 'File upload' && fileUrl ? fileUrl : response.response,
        file: question.type === 'File upload' && fileUrl ? fileUrl : null
      };
    });

    console.log(updatedResponses, "updatedResponses");

    // Create the feedback document
    const newFeedback = new FeedbackModel({
      formId,
      user,
      responses: updatedResponses,
      submittedAt: Date.now()
    });

    // Save the feedback to the database
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

// Retrieve list of feedback based on admin

export const RetrievingListOfFeedbackBasedOnAdmin = async(req,res)=>{
  try{
    const admin = await Admin.findById(req.admin).populate('feedbacksAssigned')
    if(!admin){
      return res.status(404).json({message:'Admin not found',sucess:false})
    }
    res.json(admin.feedbacksAssigned);
  }
  catch(err){
    res.status(500).json({message:"server error",success:false})
  }
}

// Assign feedback task to admin
export const feedbackTaskAssign = async (req, res) => {
  const { feedbackId } = req.params;
  const { adminId, comment } = req.body;
  const assignedDate = new Date();
  try {
    // Find the feedback to get the currently assigned admin
    const feedback = await FeedbackModel.findById(feedbackId).select('assignedAdmin');
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    // Check if there's a previous admin assigned and remove the feedback from their list
    if (feedback.assignedAdmin && feedback.assignedAdmin._id) {
      await Admin.updateOne(
        { _id: feedback.assignedAdmin._id },
        { $pull: { feedbacksAssigned: feedbackId } }
      );
    }

    // Find the new admin by ID
    const admin = await Admin.findById(adminId).select('name email');
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Update the feedback with the new admin's information
    const feedbackUpdateResult = await FeedbackModel.updateOne(
      { _id: feedbackId },
      {
        $set: {
          assignedAdmin: {
            _id: admin._id,  // Store the admin ID to reference later
            name: admin.name,
            email: admin.email
          },
          status: 'assigned',
          comment: comment,
          assignedDate
        }
      }
    );

    if (feedbackUpdateResult.nModified === 0) {
      return res.status(404).json({ message: 'Feedback not found or already assigned' });
    }

    // Update the new admin to add the feedback ID
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
  const { resolutionComment,adminSubmittedDate } = req.body;

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
    feedback.adminSubmittedDate = adminSubmittedDate;
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


export const getFeedbackByStarRating = async (req, res) => {
  try {
    // Extract the admin ID from the request (set by the verifyToken middleware)
    const adminId = req.admin;
    
    // Find the admin to get the list of feedbacks assigned to them
    const admin = await Admin.findById(adminId).populate('feedbacksAssigned');
    
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Extract the list of feedbacks assigned to the admin
    const feedbacksAssigned = admin.feedbacksAssigned;

    // Filter feedbacks to only include those that are assigned to the admin
    const feedbacks = await FeedbackModel.find({
      _id: { $in: feedbacksAssigned.map(feedback => feedback._id) },
      'responses.questionType': 'Rating scale'
    });

    // Initialize an object to store the count of each rating
    const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

     console.log('hell',feedbacks)

    // Count the feedbacks by star rating
    feedbacks.forEach(feedback => {
      const rating = feedback.responses.find(r => r.questionType === 'Rating scale').response;
      if (ratingCounts[rating] !== undefined) {
        ratingCounts[rating]++;
      }
    });

    // Transform the ratingCounts object into an array
    const ratingCountsArray = Object.keys(ratingCounts).map(rating => ({
      rating: parseInt(rating),
      count: ratingCounts[rating],
    }));

    res.json(ratingCountsArray);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching feedback by star rating' });
  }
};



// Get Feedback Statistics and Trends
export const getFeebackStatisticsAndTrends= async(req,res)=>{
 try{
  const adminId = req.admin;
  // Find the admin to get the list of feedbacks assigned to them
  const admin = await Admin.findById(adminId).populate('feedbacksAssigned');
  
  if (!admin) {
    return res.status(404).json({ message: 'Admin not found' });
  }

// Extract the list of feedback IDs assigned to the admin
const feedbackIds = admin.feedbacksAssigned.map(feedback => feedback._id);

// Perform the aggregation only on the feedbacks assigned to the admin
  const statistics = await FeedbackModel.aggregate([
    {
      $match: {
        _id: { $in: feedbackIds },
      },
    },
    {
      $group:{
        _id:{$dateToString:{format:"%Y-%m-%d",date:"$submittedAt"}},
        submissions:{$sum:1},
      },
    },
    {$sort:{_id:1}},
  ]);
  res.status(200).json(statistics)
}
catch(err){
  res.status(500).json({message:"Error Fetching feedback Statistics"})
}
}

// Get Track and Flag Repeated Issues
export const getFeedbackTrackAndFlagRepeatedIssues = async(req,res)=>{
  try{
    const adminId = req.admin;
    // Find the admin to get the list of feedbacks assigned to them
    const admin = await Admin.findById(adminId).populate('feedbacksAssigned');
    
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Extract the list of feedback IDs assigned to the admin
    const feedbackIds = admin.feedbacksAssigned.map(feedback => feedback._id);

    const repeatedIssues = await FeedbackModel.aggregate([
      {
        $match: {
          _id: { $in: feedbackIds }, // Match only feedbacks assigned to this admin
        },
      },
      { $unwind: '$responses' },
      { $match: { 'responses.response': { $exists: true, $ne: null } } },
      { $group: { _id: '$responses.response', count: { $sum: 1 } } },
      { $match: { count: { $gt: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.status(200).json(repeatedIssues);
  }
  catch(err){
    res.status(500).json({message:"Error Fetching repeated Issues"})
  }
}

// get search feedback

export const getSearchFeedback = async (req, res) => {
  try {
    const adminId = req.admin;

    // Find the admin to get the list of feedbacks assigned to them
    const admin = await Admin.findById(adminId).populate('feedbacksAssigned');

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const { query } = req.query;

    // Extract the list of feedback IDs assigned to the admin
    const feedbackIds = admin.feedbacksAssigned.map(feedback => feedback._id);

    // Search only within the feedbacks assigned to the admin
    const feedbacks = await FeedbackModel.find({
      _id: { $in: feedbackIds }, // Filter by assigned feedbacks
      $or: [
        { 'user.name': new RegExp(query, 'i') },
        { 'user.email': new RegExp(query, 'i') },
        { 'user.phone': new RegExp(query, 'i') },
        { 'responses.response': new RegExp(query, 'i') }
      ],
    });

    res.json(feedbacks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error searching feedback' });
  }
};


export const superadminfeedbackStatistics = async(req,res)=>{
  try {
    const stats = await getFeedbackStatistics();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch feedback statistics' });
  }
}