import httpStatusCodes from './httpStatusCode';
import BaseError from './baseError';


export default class Api404Error extends BaseError {
    constructor (
        errorMessage: string,
        statusCode = httpStatusCodes.NOT_FOUND,
        description = 'Not found.',
        isOperational = true
    ) {
        super(errorMessage, statusCode, isOperational, description)
    }
}
