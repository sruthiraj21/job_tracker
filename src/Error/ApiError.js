class ApiError extends Error {

    constructor(statusCode, message) {

        super(message);

        this.statusCode = statusCode;

        this.statusCode >= 400 && (this.success = false);

        Error.captureStackTrace(this, this.constructor);
    }

}

export default ApiError;