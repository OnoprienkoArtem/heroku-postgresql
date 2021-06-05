import express from 'express';
import passport from 'passport';
import authenticate from '../middleware/authenticate';

import { schema } from '../validation/validationSchema';
import { validateSchema } from '../validation/validator';

import UserController from '../controllers/UserController';
import UserService from '../services/User.service';


const router = express.Router();
const userController = new UserController(new UserService());

router.get('/', authenticate, userController.getAutoSuggestUsers);
router.get('/:id', authenticate, userController.getUserById);
router.post('/', authenticate, userController.createUser);
router.put('/:id', authenticate, validateSchema(schema), userController.updateUserById);
router.delete('/:id', authenticate, userController.removeUserById);

export default router;
