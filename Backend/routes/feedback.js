import express from 'express'
import { allFormsRetrieving, feedbackBasedonId, storeFeedback, updatingFormBasedonId } from '../controllers/feedback.js'

const feedbackRouter = express.Router()

feedbackRouter.post("/create",storeFeedback)

feedbackRouter.get("/allForms",allFormsRetrieving)
feedbackRouter.get("/forms/:id",feedbackBasedonId)
feedbackRouter.put("/forms/:id",updatingFormBasedonId)
export default feedbackRouter