import { Request, Response } from 'express';
import UserService from '../services/User';

export default class UserController {

    constructor(private readonly userService: UserService) {}

     public getAutoSuggestUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            res.send(await this.userService.getUsers(req));
        } catch (error) {
            res.status(404).send(error);
        }
    }

    public getUserById = async (req: Request, res: Response): Promise<void> => {
        try {
            await this.userService.handleIdError(req.params.id);
            res.json(await this.userService.getUserById(req));
        } catch (error) {
            res.status(404).json({message: 'id not found'});
        }
    }

    public createUser = async (req: Request, res: Response): Promise<void> => {
        try {
            res.send(await this.userService.createUser(req));
        } catch (error) {
            res.status(404).send(error);
        }
    }

    public updateUserById = async (req: Request, res: Response): Promise<void> => {
        try {
            await this.userService.handleIdError(req.params.id);
            res.send(await this.userService.updateUserById(req));
        } catch (error) {
            res.status(404).json({message: 'id not found'});
        }
    }

    public removeUserById = async (req: Request, res: Response): Promise<void> => {
        try {
            await this.userService.handleIdError(req.params.id);
            res.send(await this.userService.removeUserById(req));
        } catch (error) {
            res.status(404).json({message: 'id not found'});
        }
    }
}
