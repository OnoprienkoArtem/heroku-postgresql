import { Request, Response } from 'express';

import BaseError from './baseError';
import logger from './logger';
import { HttpStatusCode } from './httpStatusCode';


export function returnError(error: BaseError, req: Request, res: Response, next: (arg: any) => void): void {
    res
        .status(error.statusCode || HttpStatusCode.INTERNAL_SERVER)
        .json({
            statusCode: error.statusCode,
            message: error.message,
            errorMessage: error.errorMessage
        });
}

export function logError(error: BaseError): void {
    logger.error(error);
}

export function isOperationalError(error: BaseError): boolean {
    if (error) {
        return error.isOperational;
    }

    return false;
}
