import { Request, Response } from 'express';

import UserService from '../services/User.service';
import Api404Error from '../utils/hendleError/hendleError';
import {UserType} from '../types/user';


export default class UserController {
    constructor(public readonly userService: UserService) {
    }

    public getAutoSuggestUsers = async (req: Request, res: Response, next: (arg: any) => void): Promise<void> => {
        try {
            const users: Array<UserType> = await this.userService.getUsers(req.query.login, req.query.limit);

            if (users.length === 0) {
                throw new Api404Error(`Users not found.`);
            }

            res.send(await this.userService.getUsers(req.query.login, req.query.limit));
        } catch (error) {
            next(error);
        }
    }

    public getUserById = async (req: Request, res: Response, next: (arg: any) => void): Promise<void> => {
        try {
            await this.handleErrorNotFoundByUserId(req.params.id as unknown as number);

            res.json(await this.userService.getUserById(req.params.id as unknown as number));
        } catch (error) {
            next(error);
        }
    }

    public createUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const user: UserType = await this.userService.createUser(req.query);
            res.status(201).send(await this.userService.createUser(user));
        } catch (error) {
            console.log(error)
        }
    }

    public updateUserById = async (req: Request, res: Response, next: (arg: any) => void): Promise<void> => {
        try {
            await this.handleErrorNotFoundByUserId(req.params.id as unknown as number);

            res.send(await this.userService.updateUserById(req.query, req.params.id));
        } catch (error) {
            next(error);
        }
    }

    public removeUserById = async (req: Request, res: Response, next: (arg: any) => void): Promise<void> => {
        try {
            await this.handleErrorNotFoundByUserId(req.params.id as unknown as number);

            res.send(await this.userService.removeUserById(req.params.id));
        } catch (error) {
            next(error);
        }
    }

    public handleErrorNotFoundByUserId = async (id: number): Promise<void> => {
        const user: UserType = await this.userService.getUserById(id);

        if (user === null) {
            throw new Api404Error(`User with id: ${id} not found.`);
        }
    }
}
