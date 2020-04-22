import {inject, injectable} from "inversify";
import {interfaces} from 'inversify-express-utils';
import {Request, Response, NextFunction} from "express";
import TYPES from "../inversify-config/types";
import {IUser} from "../interfaces/IUser";
import {AuthService} from "./auth";

@injectable()
export class AuthProvider implements interfaces.AuthProvider {

    @inject(TYPES.AuthService) private readonly _auth: AuthService;

    public async getUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<interfaces.Principal> {
        const token = req.headers.authorization.toString().split('Bearer: ')[1];
        try {
            const user = await this._auth.getUserByToken(token);
            return new Principal<IUser>(user)
        } catch(e) {
            throw e;
        }
    }
}

class Principal<K> implements interfaces.Principal {
    public constructor(public details: K) {}

    isAuthenticated(): Promise<boolean> {
        return Promise.resolve(true);
    }
    isInRole(role: string): Promise<boolean> {
        return Promise.resolve(role === 'admin')
    }
    isResourceOwner(resourceId: any): Promise<boolean> {
        return Promise.resolve(resourceId === 1111);
    }
}