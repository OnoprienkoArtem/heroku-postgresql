import express from 'express';
import passport from 'passport';

import GroupUsersController from '../controllers/GroupUsersController';
import GroupUsersService from '../services/GroupUsers.service';


const groupUsersRouter = express.Router();
const groupUsersController = new GroupUsersController(new GroupUsersService());

groupUsersRouter.post('/', passport.authenticate('jwt', {session: false}), groupUsersController.addUsersToGroup);

export default groupUsersRouter;
