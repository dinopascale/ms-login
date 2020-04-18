import {NextFunction, Request, Response, Router} from "express";

const route: Router = Router();

export default (router: Router) => {
    router.use('/auth', route);

    route.post(
        '/signup',
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const {email, token} = req.body;
                return res.json({status: 'ok da signup'}).status(201);
            } catch (e) {
                return next(e);
            }
        }
    )

    route.post(
        '/signin',
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const {email, password} = req.body;
                return res.json({status: 'ok da signin'}).status(200);
            } catch (e) {
                return next(e);
            }
        }
    )
}