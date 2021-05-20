import {Request, Response} from "express";

import BaseError from "./baseError";
import httpStatusCodes from "./httpStatusCode";


export function returnError(error: BaseError, req: Request, res: Response, next: any): void {
    res
        .status(error.statusCode || httpStatusCodes.INTERNAL_SERVER)
        .json({
            statusCode: error.statusCode,
            message: error.message,
            errorMessage: error.errorMessage,
        });
}

export function logError(error: BaseError): void {
    console.error(error);
}

export function isOperationalError(error: BaseError): boolean {
    if (error) {
        return error.isOperational;
    }

    return false;
}
