import express from 'express'

import { addQuestions } from '../controllers/questions.js'
import { retrievingFeedback } from '../controllers/questions.js'

const addQuestionsRouter =express.Router()

addQuestionsRouter.post("/questions",addQuestions)
addQuestionsRouter.get("/questions",retrievingFeedback)

export default addQuestionsRouter