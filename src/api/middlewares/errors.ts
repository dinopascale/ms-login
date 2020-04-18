import {ErrorRequestHandler, NextFunction, Request, RequestHandler, Response} from "express";

interface ResponseError extends Error {
    status?: number;
}

export const notFound: RequestHandler  = async (req: Request, res: Response, next: NextFunction) => {
    const err: ResponseError = new Error('Route Not Found');
    err.status = 404;
    next(err);
}

export const token: ErrorRequestHandler = async (err, req, res, next) => {
    // error token
}

export const general: ErrorRequestHandler = async (err: ResponseError, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        errors: {
            message: err.message
        }
    })
}