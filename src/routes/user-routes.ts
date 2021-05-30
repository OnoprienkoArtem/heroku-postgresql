import express from 'express';
import passport from 'passport';

import { schema } from '../validation/validationSchema';
import { validateSchema } from '../validation/validator';

import UserController from '../controllers/UserController';
import UserService from '../services/User.service';


const router = express.Router();
const userController = new UserController(new UserService());

router.get('/', passport.authenticate('jwt', {session: false}), userController.getAutoSuggestUsers);
router.get('/:id', passport.authenticate('jwt', {session: false}), userController.getUserById);
router.post('/', passport.authenticate('jwt', {session: false}), validateSchema(schema), userController.createUser);
router.put('/:id', passport.authenticate('jwt', {session: false}), validateSchema(schema), userController.updateUserById);
router.delete('/:id', passport.authenticate('jwt', {session: false}), userController.removeUserById);

export default router;
