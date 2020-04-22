import TYPES from "../inversify-config/types";
import {provide} from 'inversify-binding-decorators'
import {inject} from "inversify";
import {Logger} from 'winston';
import {MongoDbClient} from "./db";
import {IUser, IUserInput} from "../interfaces/IUser";
import {IAuthSignUp} from "../interfaces/IAuth";
import {genSalt, hash} from 'bcrypt';
import {sign} from 'jsonwebtoken';
import {FormatterService} from "./formatter";
import {IResultError} from "../interfaces/IHelpers";

@provide(TYPES.AuthService)
export class AuthService {
    constructor(
        @inject(TYPES.LoggerService) private readonly _logger: Logger,
        @inject(TYPES.MongoService) private readonly _mongoClient: MongoDbClient,
        @inject(TYPES.FormatterService) private readonly _formatter: FormatterService
    ) {}

    public async signIn(): Promise<void> {
    }

    public async signUp(userInput: IUserInput): Promise<IAuthSignUp | IResultError> {
        try {
            const salt = await genSalt(10);
            this._logger.silly('Hashing password');
            const hashedPassword = await hash(userInput.password, salt);
            this._logger.silly('Creating user db record');
            const userRecord = await this._mongoClient.insert<IUser>('user', {
                ...userInput,
                salt: salt.toString(),
                password: hashedPassword
            })

            if (!userRecord) {
                return {error: 'User cannot be created'}
            }
            this._logger.silly('Generating JWT');
            const token = this.generateToken(userRecord)
            const user = this._formatter.userForSignUpResponse(userRecord);
            return {user, token}

        } catch(e) {
            this._logger.error(e);
            throw e;
        }
    }

    private generateToken(user: IUser): string {
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);

        this._logger.silly(`Sign JWT for userId: ${user._id}`);
        return sign(
            {
                _id: user._id,
                name: user.name,
                exp: exp.getTime() / 1000
            },
            'supersecret'
        )
    }
}