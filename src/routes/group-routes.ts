import express from 'express';

import GroupController from '../controllers/GroupController';
import authenticate from '../middleware/authenticate';
import GroupService from '../services/Group.service';


const groupRouter = express.Router();
const groupController = new GroupController(new GroupService());

groupRouter.get('/:id', authenticate, groupController.getGroupById);
groupRouter.get('/', authenticate, groupController.getAllGroups);
groupRouter.post('/', authenticate, groupController.createNewGroup);
groupRouter.put('/:id', authenticate, groupController.updateGroupById);
groupRouter.delete('/:id', authenticate, groupController.removeGroupById);

export default groupRouter;
