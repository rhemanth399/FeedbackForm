import express from 'express'
import { createAdmin, getListOfAdmins, loginAdmin } from '../controllers/admin.js';

const adminRouter = express.Router();

adminRouter.post("/admin/create",createAdmin)
adminRouter.get("/admin/listofadmins",getListOfAdmins)
adminRouter.post("/admin/login",loginAdmin)

export default adminRouter