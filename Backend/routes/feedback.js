import express from 'express'
import { storingFeedback } from '../controllers/createFeedback.js'

const feedbackRouter = express.Router()

feedbackRouter.post("/create",storingFeedback)

export default feedbackRouter