export default class HttpError extends Error {
    public statusCode: number;
    public isOperational: boolean;
    public errorMessage: string;

    constructor(errorMessage: string, statusCode: number, isOperational: boolean, description: string) {
        super(description);

        Object.setPrototypeOf(this, new.target.prototype);
        this.errorMessage = errorMessage;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
}
