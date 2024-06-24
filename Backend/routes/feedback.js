import express from 'express';
import { RetrievingListOfFeedback, createFeedback } from '../controllers/feedback.js'; 

const feedbackRouter = express.Router();

// Route for creating feedback
feedbackRouter.post('/feedback', createFeedback);

feedbackRouter.get("/listOfFeedback",RetrievingListOfFeedback)

export default feedbackRouter;
