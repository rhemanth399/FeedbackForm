import express from 'express';
import { RetrievingListOfFeedback, RetrievingListOfFeedbackBasedOnAdmin, createFeedback, feedbackTaskAssign, feedbackTaskResolve, getFeebackStatisticsAndTrends, getFeedbackByStarRating, getFeedbackTrackAndFlagRepeatedIssues, getSearchFeedback, superadminfeedbackStatistics } from '../controllers/feedback.js'; 

import { upload } from '../middlewares/multer.js';
import verifyToken from '../middlewares/verifyToken.js';

const feedbackRouter = express.Router();



// Route for creating feedback
feedbackRouter.post('/feedback', upload.single("file"), createFeedback);

feedbackRouter.get('/admin/listoffeedback',verifyToken,RetrievingListOfFeedbackBasedOnAdmin);

feedbackRouter.get('/admin/feedback/starrating',verifyToken,getFeedbackByStarRating)

feedbackRouter.get("/admin/feedbackstatistics",verifyToken,getFeebackStatisticsAndTrends)

feedbackRouter.get("/admin/feedback/repeatedissues",verifyToken,getFeedbackTrackAndFlagRepeatedIssues)

feedbackRouter.get("/admin/feedbackbasedonsearch",verifyToken,getSearchFeedback)

feedbackRouter.get("/listOfFeedback",RetrievingListOfFeedback)

feedbackRouter.put("/:feedbackId/assign",feedbackTaskAssign)

feedbackRouter.put("/:feedbackId/resolve",feedbackTaskResolve);

feedbackRouter.get('/feedback-statistics',superadminfeedbackStatistics)
export default feedbackRouter;
