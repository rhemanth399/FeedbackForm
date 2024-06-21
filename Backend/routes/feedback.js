import express from 'express';
import { createFeedback } from '../controllers/feedback.js'; 

const feedbackRouter = express.Router();

// Route for creating feedback
feedbackRouter.post('/feedback', createFeedback);

export default feedbackRouter;
