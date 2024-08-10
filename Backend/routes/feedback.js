import express from 'express';
import { RetrievingListOfFeedback, RetrievingListOfFeedbackBasedOnAdmin, createFeedback, feedbackTaskAssign, feedbackTaskResolve } from '../controllers/feedback.js'; 
import multer from 'multer';
import { upload } from '../middlewares/multer.js';
import verifyToken from '../middlewares/verifyToken.js';

const feedbackRouter = express.Router();



// Route for creating feedback
feedbackRouter.post('/feedback', upload.single("file"), createFeedback);

feedbackRouter.get('/admin/listoffeedback',verifyToken,RetrievingListOfFeedbackBasedOnAdmin);

feedbackRouter.get("/listOfFeedback",RetrievingListOfFeedback)

feedbackRouter.put("/:feedbackId/assign",feedbackTaskAssign)

feedbackRouter.put("/:feedbackId/resolve",feedbackTaskResolve);
export default feedbackRouter;
