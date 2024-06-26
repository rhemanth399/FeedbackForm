import express from 'express'
import { createAdmin, getListOfAdmins } from '../controllers/admin.js';

const adminRouter = express.Router();

adminRouter.post("/admin/create",createAdmin)
adminRouter.get("/admin/listofadmins",getListOfAdmins)

export default adminRouter