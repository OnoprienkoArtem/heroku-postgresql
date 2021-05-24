import { NextFunction, Request, Response } from 'express';

import HttpError from './httpError';
import logger from './logger';
import { HttpStatusCode } from './httpStatusCode';


export function returnError(error: HttpError, req: Request, res: Response, next: NextFunction): void {
    res
        .status(error.statusCode || HttpStatusCode.INTERNAL_SERVER)
        .json({
            statusCode: error.statusCode,
            message: error.message,
            errorMessage: error.errorMessage
        });
}

export function logError(error: HttpError): void {
    logger.error(error);
}

export function isOperationalError(error: HttpError): boolean {
    if (error) {
        return error.isOperational;
    }

    return false;
}
