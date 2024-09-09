import express from 'express'
import { createAdmin, deleteAdmin, getListOfAdmins, loginAdmin, updateAdmin, updateAdminCanCreateForm, updateAdminCanEditForm } from '../controllers/admin.js';

const adminRouter = express.Router();

adminRouter.post("/admin/create",createAdmin)
adminRouter.get("/admin/listofadmins",getListOfAdmins)
adminRouter.post("/admin/login",loginAdmin)
adminRouter.put("/admin/updateCanCreateForm",updateAdminCanCreateForm)
adminRouter.put("/admin/updateCanEditForm",updateAdminCanEditForm)
adminRouter.delete("/admin/delete/:id",deleteAdmin)
adminRouter.put("admin/update/:id",updateAdmin)

export default adminRouter