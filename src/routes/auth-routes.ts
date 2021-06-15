import express from 'express';

import AuthController from '../controllers/AuthController';
import AuthService from '../services/Auth.service';


const authRouter = express.Router();
const authController = new AuthController(new AuthService());

authRouter.post('/', authController.login);

export default authRouter;
