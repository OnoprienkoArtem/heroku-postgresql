import express from 'express';
import UserController from '../controllers/UserController';
import { schema } from '../validation/validationSchema';
import { validateSchema } from '../validation/validator';
import UserService from '../services/User';

const router = express.Router();
const userController = new UserController(new UserService());

router.get('/', userController.getAutoSuggestUsers);
router.get('/:id', userController.getUserById);
router.post('/', validateSchema(schema), userController.createUser);
router.put('/:id', validateSchema(schema), userController.updateUserById);
router.delete('/:id', userController.removeUserById);

export default router;
