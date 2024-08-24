import express from 'express'
import { superAdminLogin } from '../controllers/superadmin';

const superAdminRouter = express.Router();

superAdminRouter.post("/login",superAdminLogin)

export default superAdminRouter