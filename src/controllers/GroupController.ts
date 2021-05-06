import { Request, Response } from 'express';

import GroupService from '../services/Group.service';


export default class GroupController {
    constructor(public readonly groupService: GroupService) {}

    public getGroupById = async (req: Request, res: Response): Promise<void> => {
        try {
            res.status(200).send(await this.groupService.getGroupById(req.params.id));
        } catch (error) {
            res.status(404).send(error);
        }
    }

    public getAllGroups = async (req: Request, res: Response): Promise<void> => {
        try {
            res.status(200).send(await this.groupService.getAllGroups());
        } catch (error) {
            res.status(404).send(error);
        }
    }

    public createNewGroup = async (req: Request, res: Response): Promise<void> => {
        try {
            res.status(201).send(await this.groupService.createNewGroup(req.body.name, req.body.permissions));
        } catch (error) {
            res.status(404).send(error);
        }
    }

    public updateGroupById = async (req: Request, res: Response): Promise<void> => {
        try {
            res.status(200).send(await this.groupService.updateGroupById(req.params.id, req.body.name, req.body.permissions));
        } catch (error) {
            res.status(404).send(error);
        }
    }

    public removeGroupById = async (req: Request, res: Response): Promise<void> => {
        try {
            res
                .status(200)
                .json({ message: 'Group has been deleted.' })
                .send(await this.groupService.removeGroupById(req.params.id));
        } catch (error) {
            res.status(404).send(error);
        }
    }
}
