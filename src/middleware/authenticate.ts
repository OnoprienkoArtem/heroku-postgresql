import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { Api401Error, Api403Error } from '../utils/handleError/handleError';

dotenv.config();

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, `${ process.env.TOKEN_SECRET }`, (error) => {
            if (error?.name === 'TokenExpiredError') {
                throw new Api403Error('Authorization JWT token is expired.');
            }

            if (error) {
                throw new Api403Error('Authorization header has invalid JWT token in the request.');
            }

            next();
        });
    } else {
        throw new Api401Error('Authorization header is absent in the request.');
    }
};


export default authenticate;
