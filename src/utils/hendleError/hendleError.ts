import {Response} from "express";

export interface ErrorResponse extends Error{
    status: number;
    message: string;
}

export function errorHandler(error: ErrorResponse, res: Response): Response {
    console.log(error)
    return res.status(error.status).json({
        success: false,
        message: error.message ? error.message : error,
    });
}



