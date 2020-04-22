import TYPES from "../inversify-config/types";
import {provide} from "inversify-binding-decorators";
import {IUser} from "../interfaces/IUser";
import {IUserWithoutSecret} from "../interfaces/IAuth";

@provide(TYPES.FormatterService)
export class FormatterService {
    constructor() {}

    public userForSignUpResponse(userDb: IUser): IUserWithoutSecret {
        return Object.entries(userDb)
            .filter(([k, _]) => k !== 'password' && k !== 'salt')
            .reduce((obj, [k, v]) =>( {...obj, [k]: v }), {name: '', surname: '', email: ''})
    }
}