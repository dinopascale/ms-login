import TYPES from "../inversify-config/types";
import {provide} from 'inversify-binding-decorators'
import {inject} from "inversify";
import {Logger} from 'winston';
import {IUser, IUserInputSignUp} from "../interfaces/IUser";
import {IAuthSign} from "../interfaces/IAuth";
import {compare, genSalt, hash} from 'bcrypt';
import {sign} from 'jsonwebtoken';
import {FormatterService} from "./formatter";
import {IResultError} from "../interfaces/IHelpers";
import {UserService} from "./user";

@provide(TYPES.AuthService)
export class AuthService {
    constructor(
        @inject(TYPES.LoggerService) private readonly _logger: Logger,
        @inject(TYPES.UserService) private readonly _user: UserService,
        @inject(TYPES.FormatterService) private readonly _formatter: FormatterService
    ) {}

    public async signIn(email: string, password: string): Promise<IAuthSign | IResultError> {
        try {
            const userRecord = await this._user.getUser(email);
            if (!userRecord) {
                this._logger.error('Failed in sign in user, user not exist')
                return {error: 'User not found'}
            }
            this._logger.silly('Checking password');
            const validPassword = await compare(password, userRecord.password);
            if (!validPassword) {
                this._logger.error('Failed in sign in user, password not valid')
                return {error: 'Invalid Password'}
            }
            this._logger.silly('Password is valid');
            this._logger.silly('Generating JWT');
            const token = this.generateToken(userRecord);
            const user = this._formatter.userForSignUpResponse(userRecord);
            return {user, token};
        } catch(e) {
            this._logger.error('Error in sign in user: ' + e);
            throw e;
        }
    }
    public async signUp(userInput: IUserInputSignUp): Promise<IAuthSign | IResultError> {
        try {
            const salt = await genSalt(10);
            this._logger.silly('Hashing password');
            const hashedPassword = await hash(userInput.password, salt);
            this._logger.silly('Creating user db record');
            const userRecord = await this._user.createUser({
                ...userInput,
                salt: salt.toString(),
                password: hashedPassword
            })
            if (!userRecord) {
                this._logger.error('Cannot creating user: userRecord empty')
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