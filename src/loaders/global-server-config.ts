import {interfaces} from "inversify-express-utils";
import ConfigFunction = interfaces.ConfigFunction;
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import {NextFunction, Request, RequestHandler, Response} from "express";

interface ResponseError extends Error {
    status?: number;
}

// custom middlewares
export const notFound: RequestHandler  = async (req: Request, res: Response, next: NextFunction) => {
    const err: ResponseError = new Error('Route Not Found');
    err.status = 404;
    next(err);
}

// init all middlewares
export const globalServerConfig: ConfigFunction = (app) => {
    app.use(morgan('tiny'));
    app.use(bodyParser.json());
    app.use(notFound)
}

// init last middlewares for errors
export const globalErrorConfig: ConfigFunction = (app) => {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message
            }
        })
    })
}