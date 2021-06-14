import express from 'express';

import GroupController from '../controllers/GroupController';
import authenticate from '../middleware/authenticate';
import GroupService from '../services/Group.service';


const groupRouter = express.Router();
const groupController = new GroupController(new GroupService());

groupRouter.get('/:id', groupController.getGroupById);
groupRouter.get('/', groupController.getAllGroups);
groupRouter.post('/', groupController.createNewGroup);
groupRouter.put('/:id', groupController.updateGroupById);
groupRouter.delete('/:id', groupController.removeGroupById);

export default groupRouter;
