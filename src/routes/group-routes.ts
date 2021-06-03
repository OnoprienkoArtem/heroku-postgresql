import express from 'express';
import passport from 'passport';

import GroupController from '../controllers/GroupController';
import GroupService from '../services/Group.service';


const groupRouter = express.Router();
const groupController = new GroupController(new GroupService());

groupRouter.get('/:id', passport.authenticate('jwt', {session: false}), groupController.getGroupById);
groupRouter.get('/', passport.authenticate('jwt', {session: false}), groupController.getAllGroups);
groupRouter.post('/', passport.authenticate('jwt', {session: false}), groupController.createNewGroup);
groupRouter.put('/:id', passport.authenticate('jwt', {session: false}), groupController.updateGroupById);
groupRouter.delete('/:id', passport.authenticate('jwt', {session: false}), groupController.removeGroupById);

export default groupRouter;
