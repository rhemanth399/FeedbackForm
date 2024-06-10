import express from 'express'
import { storeFeedback } from '../controllers/feedback.js'

const feedbackRouter = express.Router()

feedbackRouter.post("/create",storeFeedback)

export default feedbackRouter