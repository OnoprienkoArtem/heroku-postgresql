import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import AuthService from '../services/Auth.service';
import { Api401Error, Api404Error } from '../utils/handleError/handleError';


export default class AuthController {
    constructor(public readonly authService: AuthService) {
    }

    public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const candidate = await this.authService.getCandidate(req.body.username);

            if (candidate) {
                if (candidate.password === req.body.password) {
                    const token = jwt.sign({
                        login: candidate?.get('login'),
                        id: candidate?.get('id'),
                    }, `${ process.env.TOKEN_SECRET }`, { expiresIn: 3600 });

                    res.status(200).json({
                        token: `Bearer ${ token }`
                    });
                } else {
                    throw new Api401Error('Passwords mismatch. Try again.');
                }
            } else {
                throw new Api404Error(`User with not found.`);
            }

        } catch (error) {
            return next(error);
        }
    };
}
