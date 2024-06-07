import express from 'express'

import { addQuestions } from '../controllers/questions.js'

const addQuestionsRouter =express.Router()

addQuestionsRouter.post("/questions",addQuestions)

export default addQuestionsRouter