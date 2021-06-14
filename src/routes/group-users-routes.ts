import express from 'express';

import GroupUsersController from '../controllers/GroupUsersController';
import authenticate from '../middleware/authenticate';
import GroupUsersService from '../services/GroupUsers.service';


const groupUsersRouter = express.Router();
const groupUsersController = new GroupUsersController(new GroupUsersService());

groupUsersRouter.post('/', groupUsersController.addUsersToGroup);

export default groupUsersRouter;
