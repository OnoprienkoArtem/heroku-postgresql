import express from 'express';

import { schema } from '../validation/validationSchema';
import { validateSchema } from '../validation/validator';

import UserController from '../controllers/UserController';
import UserService from '../services/User.service';


const router = express.Router();

const userController = new UserController(new UserService());

router.get('/', userController.getAutoSuggestUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', validateSchema(schema), userController.updateUserById);
router.delete('/:id', userController.removeUserById);

export default router;
