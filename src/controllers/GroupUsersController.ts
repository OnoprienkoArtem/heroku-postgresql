import { Request, Response } from 'express';

import GroupUsersService from '../services/GroupUsers.service';


export default class GroupUsersController {
    constructor(public readonly groupUsersService: GroupUsersService) {}

    public addUsersToGroup = async (req: Request, res: Response): Promise<void> => {
        try {
            res
                .status(201)
                .send(await this.groupUsersService.addUsersToGroup(req.body.userIds, req.body.groupId));
        } catch (error) {
            res.status(404).send(error);
        }
    }
}
