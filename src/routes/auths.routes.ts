import { Router, Request, Response } from "express";
import * as userController from "../controllers/user.controller";
import * as authController from '../controllers/auth.controller';

const router: Router = Router();

router.post('/login', authController.login);
router.post('/login/:userId', authController.loginById)
router.post('/signup', authController.signup);

export default router;