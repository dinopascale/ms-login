import TYPES from "../inversify-config/types";
import {provide} from 'inversify-binding-decorators'
import {inject} from "inversify";
import {Logger} from 'winston';

@provide(TYPES.AuthService)
export class AuthService {
    constructor(@inject(TYPES.LoggerService) private readonly _logger: Logger) {}

    public signIn(): Promise<{ status: string }> {
        return new Promise<{status: string}>((resolve, _) => {
            this._logger.info('Ehi ciao');
            setTimeout(() => resolve({status: 'Ehi signIn funzia'}), 500);
        })
    }

    public signUp(): Promise<{ status: string }> {
        return new Promise<{status: string}>((resolve, _) => {
            setTimeout(() => resolve({status: 'Ehi signUp funzia'}), 500);
        })
    }
}