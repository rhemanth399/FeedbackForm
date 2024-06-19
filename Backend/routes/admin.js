import express from 'express'
import { createAdmin } from '../controllers/admin.js';

const adminRouter = express.Router();

adminRouter.post("/admin/create",createAdmin)

export default adminRouter