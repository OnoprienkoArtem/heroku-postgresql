import { Request, Response } from 'express';

import UserService from '../services/User.service';
import {errorHandler} from "../utils/hendleError/hendleError";


export default class UserController {
    constructor(public readonly userService: UserService) {
    }

    public getAutoSuggestUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            res.send(await this.userService.getUsers(req.query.login, req.query.limit));
        } catch (error) {
            res.json({ message: 'Not found' });
            // errorHandler(res, error);
        }
    }

    public getUserById = async (req: Request, res: Response): Promise<void> => {
        try {
            await this.userService.handleIdError(req.params.id, 'id not found', 404);

            res.json(await this.userService.getUserById(req.params.id));



        } catch (error) {
            // res.json({ message: 'id not found' });

            errorHandler(error, res);
        }
    }

    public createUser = async (req: Request, res: Response): Promise<void> => {
        try {
            res.send(await this.userService.createUser(req.query));
        } catch (error) {
            res.json({ message: 'Not found' });
            // errorHandler(res, error);
        }
    }

    public updateUserById = async (req: Request, res: Response): Promise<void> => {
        try {
            // await this.userService.handleIdError(req.params.id);
            res.send(await this.userService.updateUserById(req.query, req.params.id));
        } catch (error) {
            res.json({ message: 'id not found' });
            // errorHandler(res, error);
        }
    }

    public removeUserById = async (req: Request, res: Response): Promise<void> => {
        try {
            // await this.userService.handleIdError(req.params.id);
            res.send(await this.userService.removeUserById(req.params.id));
        } catch (error) {
            res.json({ message: 'id not found' });
            // errorHandler(res, error);
        }
    }
}
