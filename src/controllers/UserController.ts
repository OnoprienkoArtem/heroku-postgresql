import { Request, Response, NextFunction } from 'express';

import UserService from '../services/User.service';
import { Api404Error } from '../utils/handleError/handleError';
import { UserType } from '../types/user';
import { logError } from '../utils/handleError/helpers';

const userService = new UserService();

export const getAutoSuggestUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users: Array<UserType> = await userService.getUsers(req.query.login, req.query.limit);

        if (users.length === 0) {
            throw new Api404Error('Users not found.');
        }

        res.send(users);
    } catch (error) {
        return next(error);
    }
};

// export default class UserController {
//     constructor(public readonly userService: UserService) {
//     }
//
//     public getAutoSuggestUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//         try {
//             const users: Array<UserType> = await this.userService.getUsers(req.query.login, req.query.limit);
//
//             if (users.length === 0) {
//                 throw new Api404Error('Users not found.');
//             }
//
//             res.send(users);
//         } catch (error) {
//             return next(error);
//         }
//     };
//
//     public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//         try {
//             await this.handleErrorNotFoundByUserId(req.params.id as unknown as number);
//
//             res.json(await this.userService.getUserById(req.params.id as unknown as number));
//         } catch (error) {
//             return next(error);
//         }
//     };
//
//     public createUser = async (req: Request, res: Response): Promise<void> => {
//         try {
//             res.status(201).send(await this.userService.createUser(req.query));
//         } catch (error) {
//             logError(error);
//         }
//     };
//
//     public updateUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//         try {
//             await this.handleErrorNotFoundByUserId(req.params.id as unknown as number);
//
//             res.send(await this.userService.updateUserById(req.query, req.params.id));
//         } catch (error) {
//             return next(error);
//         }
//     };
//
//     public removeUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//         try {
//             await this.handleErrorNotFoundByUserId(req.params.id as unknown as number);
//             await this.userService.removeUserById(req.params.id);
//
//             res.send({ message: 'User has been deleted.' });
//         } catch (error) {
//             return next(error);
//         }
//     };
//
//     private handleErrorNotFoundByUserId = async (id: number): Promise<void> => {
//         const user: UserType = await this.userService.getUserById(id);
//
//         if (user === null) {
//             throw new Api404Error(`User with id: ${ id } not found.`);
//         }
//     };
// }
