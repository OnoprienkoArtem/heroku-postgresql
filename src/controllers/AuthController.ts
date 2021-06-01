import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import AuthService from '../services/Auth.service';


export default class AuthController {
    constructor(public readonly authService: AuthService) {
    }

    public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const candidate = await this.authService.getCandidate(req.body.username, req.body.password);
            // throw new Api404Error(`User with not found.`);

            if (candidate) {
                const token = jwt.sign({
                    login: candidate?.get('login'),
                    id: candidate?.get('id'),
                }, `${ process.env.TOKEN_SECRET }`, { expiresIn: 3600 });

                res.status(200).json({
                    token: `Bearer ${ token }`
                });
            } else {
                res.status(401).json({ message: 'Passwords mismatch. Try again.' });
            }

        } catch (error) {
            return next(error);
        }
    };
}
