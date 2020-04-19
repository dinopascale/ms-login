import {controller, httpPost, request, response} from "inversify-express-utils";
import express from "../../loaders/express";
import {Request, Response} from "express";

@controller('/auth')
export class SignInController {
    constructor() {}

    @httpPost('/signin')
    private async signIn(@request() req: Request, @response() res: Response): Promise<any> {
        return res.status(201).json({status: 'ok da signgin con inversify'})
    }

    @httpPost('/signup')
    private async signUp(@request() req: Request, @response() res: Response): Promise<any> {
        return res.status(201).json({status: 'ok da signgup con inversify'})
    }
}