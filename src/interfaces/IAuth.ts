import {IUser} from "./IUser";

export type IUserWithoutSecret = Omit<IUser, 'password' | 'salt'>;

export interface IAuthSign {
    user: IUserWithoutSecret;
    token: string;
}