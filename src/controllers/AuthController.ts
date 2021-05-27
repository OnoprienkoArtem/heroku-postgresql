import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/Auth.service';

export default class AuthController {
    constructor(public readonly authService: AuthService) {
    }

    public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {

        } catch (error) {

        }
    }
}
