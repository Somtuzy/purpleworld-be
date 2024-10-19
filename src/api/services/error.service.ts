export class AppError extends Error {
    statusCode: number

    constructor(name: string, message: string, statusCode: number) {
        super(message)
        this.name = name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundException extends AppError {
    constructor(message?: string) {
        super("Resource Not Found", message || 'Resource does not exist.', 404)
    }
}

export class ForbiddenException extends AppError {
    constructor(message?: string) {
        super("Operation Not Allowed", message || 'You are not allowed to perform this action', 403)
    }
}
export class UnAuthorizedException extends AppError {
    constructor(message?: string) {
        super("Unauthorised Operation", message || 'You are not authorised to perform this action', 401)
    }
}

export class InternalException extends AppError {
    constructor(message: string) {
        super("Internal Server Error", "Something went wrong. Please try again.", 500)
    }
}