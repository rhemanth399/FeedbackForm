import express from 'express'
import { deleteQuestion, deletingTemplate, gettingTemplates, storeTemplate, storeTemplates, templateBasedonId, updatingTemplatesBasedonId } from '../controllers/templates.js';

const templateRouter =express.Router();


templateRouter.get("/templates",gettingTemplates)
templateRouter.post("/template",storeTemplate)
templateRouter.post("/templates",storeTemplates)
templateRouter.delete("/templates/:id",deletingTemplate)
templateRouter.put("/template/:id",updatingTemplatesBasedonId)
templateRouter.get("/template/:id",templateBasedonId)
templateRouter.delete('/templates/:templateId/questions/:questionId', deleteQuestion);

export default templateRouter