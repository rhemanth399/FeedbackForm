import express from 'express'
import { createAdmin, getListOfAdmins, loginAdmin, updateAdminCanCreateForm } from '../controllers/admin.js';

const adminRouter = express.Router();

adminRouter.post("/admin/create",createAdmin)
adminRouter.get("/admin/listofadmins",getListOfAdmins)
adminRouter.post("/admin/login",loginAdmin)
adminRouter.put("/admin/updateCanCreateForm",updateAdminCanCreateForm)

export default adminRouter