import {provide} from "inversify-binding-decorators";
import TYPES from "../inversify-config/types";
import {inject} from "inversify";
import {Logger} from "winston";
import {MongoDbClient} from "./db";
import {IUser} from "../interfaces/IUser";

@provide(TYPES.UserService)
export class UserService {
    constructor(
        @inject(TYPES.LoggerService) private readonly _logger: Logger,
        @inject(TYPES.MongoService) private readonly _mongoClient: MongoDbClient
    ) {}

    public async createUser(user: IUser): Promise<IUser> {
        return this._mongoClient.insert<IUser>('user', user);
    }

    public async getUserById(userId: string): Promise<IUser> {
        return this._mongoClient.findById<IUser>('user', userId);
    }
}