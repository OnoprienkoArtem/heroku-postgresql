import HttpError from './httpError';
import { HttpStatusCode } from './httpStatusCode';


export class Api404Error extends HttpError {
    constructor(
        errorMessage: string,
        statusCode = HttpStatusCode.NOT_FOUND,
        description = 'Not found.',
        isOperational = true
    ) {
        super(errorMessage, statusCode, isOperational, description);
    }
}

export class Api401Error extends HttpError {
    constructor(
        errorMessage: string,
        statusCode = HttpStatusCode.UNAUTHORIZED,
        description = 'Unauthorized Error.',
        isOperational = true
    ) {
        super(errorMessage, statusCode, isOperational, description);
    }
}

export class Api403Error extends HttpError {
    constructor(
        errorMessage: string,
        statusCode = HttpStatusCode.FORBIDDEN,
        description = 'Forbidden Error.',
        isOperational = true
    ) {
        super(errorMessage, statusCode, isOperational, description);
    }
}
