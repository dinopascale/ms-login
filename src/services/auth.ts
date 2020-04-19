import TYPES from "../inversify-config/types";
import {provide} from 'inversify-binding-decorators'

@provide(TYPES.AuthService)
export class AuthService {
    constructor() {}

    public signIn(): Promise<{ status: string }> {
        return new Promise<{status: string}>((resolve, _) => {
            setTimeout(() => resolve({status: 'Ehi signIn funzia'}), 500);
        })
    }

    public signUp(): Promise<{ status: string }> {
        return new Promise<{status: string}>((resolve, _) => {
            setTimeout(() => resolve({status: 'Ehi signUp funzia'}), 500);
        })
    }
}