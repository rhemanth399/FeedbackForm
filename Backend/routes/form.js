import express from 'express'
import { allFormsRetrieving, deleteForm, deleteQuestion, feedbackBasedonId, storeFeedback, updatingFormBasedonId } from '../controllers/form.js'
import generateQRCodeMiddleware from '../middlewares/generateQRCodeMiddleware.js'

const formRouter = express.Router()

formRouter.post("/create",generateQRCodeMiddleware,storeFeedback)

formRouter.get("/allForms",allFormsRetrieving)
formRouter.get("/forms/:id",feedbackBasedonId)
formRouter.put("/forms/:id",updatingFormBasedonId)
formRouter.delete("/forms/:formId/questions/:questionIndex",deleteQuestion)
formRouter.delete("form/:formId",deleteForm)
export default formRouter