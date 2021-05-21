import BaseError from './baseError';
import { HttpStatusCode } from './httpStatusCode';


export default class Api404Error extends BaseError {
    constructor(
        errorMessage: string,
        statusCode = HttpStatusCode.NOT_FOUND,
        description = 'Not found.',
        isOperational = true
    ) {
        super(errorMessage, statusCode, isOperational, description);
    }
}
