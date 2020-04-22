import TYPES from "../inversify-config/types";
import {provide} from 'inversify-binding-decorators'
import {inject} from "inversify";
import {Logger} from 'winston';
import {MongoDbClient} from "./db";
import {IUserInput} from "../interfaces/IUser";
import {IAuthSignUp} from "../interfaces/IAuth";
import {genSalt, hash} from 'bcrypt';

@provide(TYPES.AuthService)
export class AuthService {
    constructor(
        @inject(TYPES.LoggerService) private readonly _logger: Logger,
        @inject(TYPES.MongoService) private readonly _mongoClient: MongoDbClient
    ) {}

    public async signIn(): Promise<void> {
    }

    public async signUp(userInput: IUserInput): Promise<IAuthSignUp> {
        try {
            const salt = await genSalt(10);
            this._logger.silly('Hashing password');
            const hashedPassword = await hash(userInput.password, salt);
            this._logger.silly('Creating user db record');
            // const userRecord =
        } catch(e) {

        }
    }
}