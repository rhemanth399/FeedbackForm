import express from 'express'
import { allFormsRetrieving, feedbackBasedonId, storeFeedback, updatingFormBasedonId } from '../controllers/form.js'

const formRouter = express.Router()

formRouter.post("/create",storeFeedback)

formRouter.get("/allForms",allFormsRetrieving)
formRouter.get("/forms/:id",feedbackBasedonId)
formRouter.put("/forms/:id",updatingFormBasedonId)
export default formRouter