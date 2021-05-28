import { NextFunction, Request, Response } from 'express';
import { Op } from 'sequelize';
import User from '../model/user';
import jwt from 'jsonwebtoken';
import AuthService from '../services/Auth.service';

export default class AuthController {
    constructor(public readonly authService: AuthService) {
    }

    public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        console.log(req.body);

        const candidate = await User.findOne({
            where: {
                login: {
                    [Op.like]: `%${req.body.username}%`
                },
                password: {
                    [Op.like]: `%${req.body.password}%`
                }
            }
        });

        if (candidate) {
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 3600});

            res.status(200).json({
                token: `Bearer ${token}`
            });
        } else {
            res.status(401).json({
                message: 'Passwords mismatch. Try again.'
            });
        }

        try {

        } catch (error) {

        }
    }
}
