class BadRequestError extends Error {
    constructor(message = 'Bad Request') {
        super(message);
        this.name = 'BadRequestError';
        this.statusCode = 400;
    }
}

class NotFoundError extends Error {
    constructor(message = 'Not Found') {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}

class ConflictError extends Error {
    constructor(message = 'Conflict') {
        super(message);
        this.name = 'ConflictError';
        this.statusCode = 409;
    }
}
class InternalServerError extends Error {
    constructor(message = 'Internal Server Error') {
        super(message);
        this.name = 'InternalServerError';
        this.statusCode = 500;
    }
}

function errorMiddleware(error, req, res, next) {
    console.log('\x1b[33m%s\x1b[0m', error);

    let message = 'Internal Server Error';
    if (error instanceof BadRequestError || error instanceof NotFoundError || error instanceof ConflictError) {
        message = error.message;
    } else {
        message = error.message;
    }

    const { statusCode = 500 } = error; // 위 에러를 모두 통과했으면 500 에러

    res.status(statusCode).send({ message });
}

export { BadRequestError, NotFoundError, ConflictError, InternalServerError, errorMiddleware };
