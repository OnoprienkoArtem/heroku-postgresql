import { NextFunction, Request, Response } from 'express';

import GroupService from '../services/Group.service';
import { Api404Error } from '../utils/handleError/handleError';
import { logError } from '../utils/handleError/helpers';


export default class GroupController {
    constructor(public readonly groupService: GroupService) {
    }

    public getGroupById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.handleErrorNotFoundByGroupId(req.params.id);

            res.send(await this.groupService.getGroupById(req.params.id));
        } catch (error) {
            return next(error);
        }
    };

    public getAllGroups = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const groups = await this.groupService.getAllGroups();

            if (groups.length === 0) {
                throw new Api404Error('Groups not found.');
            }

            res.send(groups);
        } catch (error) {
            return next(error);
        }
    };

    public createNewGroup = async (req: Request, res: Response): Promise<void> => {
        try {
            res.status(201).send(await this.groupService.createNewGroup(req.body.name, req.body.permissions));
        } catch (error) {
            logError(error);
        }
    };

    public updateGroupById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.handleErrorNotFoundByGroupId(req.params.id);

            res.send(await this.groupService.updateGroupById(req.params.id, req.body.name, req.body.permissions));
        } catch (error) {
            return next(error);
        }
    };

    public removeGroupById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.handleErrorNotFoundByGroupId(req.params.id);
            await this.groupService.removeGroupById(req.params.id);

            res.send({ message: 'Group has been deleted.' });
        } catch (error) {
            return next(error);
        }
    };

    private handleErrorNotFoundByGroupId = async (id: string): Promise<void> => {
        const group = await this.groupService.getGroupById(id);

        if (group === null) {
            throw new Api404Error(`Group with group id: ${ id } not found.`);
        }
    };
}
