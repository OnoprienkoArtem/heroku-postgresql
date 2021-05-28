import { NextFunction, Request, Response } from 'express';
import { Op } from 'sequelize';
import User from '../model/user';
import jwt from 'jsonwebtoken';
import AuthService from '../services/Auth.service';
import config from '../../config/config.json';
import Api404Error from '../utils/handleError/handleError';

export default class AuthController {
    constructor(public readonly authService: AuthService) {
    }

    public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            console.log(req.body);

            const candidate = await User.findOne({
                where: {
                    login: req.body.username,
                    password: req.body.password
                },
            });

            // throw new Api404Error(`User with not found.`);

        // if (candidate) {
        //     const token = jwt.sign({
        //         login: candidate?.get('login'),
        //         id: candidate?.get('id')
        //     }, "jwt-secret", {expiresIn: 3600});
        //
        //     res.status(200).json({
        //         token: `Bearer ${token}`
        //     });
        // } else {
        //     res.status(401).json({
        //         message: 'Passwords mismatch. Try again.'
        //     });
        // }



        } catch (error) {
            return next(error);
        }
    }
}
