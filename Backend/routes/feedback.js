import express from 'express';
import { RetrievingListOfFeedback, createFeedback, feedbackTaskAssign, feedbackTaskResolve } from '../controllers/feedback.js'; 
import multer from 'multer';

const feedbackRouter = express.Router();


//Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
      return cb(null, `${Date.now()}${file.originalname}`);
    }
  });
  
  const upload = multer({ storage: storage });

// Route for creating feedback
feedbackRouter.post('/feedback', upload.single('file'), createFeedback);

feedbackRouter.get("/listOfFeedback",RetrievingListOfFeedback)

feedbackRouter.put("/:feedbackId/assign",feedbackTaskAssign)

feedbackRouter.put("/:feedbackId/resolve",feedbackTaskResolve);
export default feedbackRouter;
