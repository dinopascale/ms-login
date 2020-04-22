import {IUser} from "./IUser";

export type IUserWithoutSecret = Omit<IUser, 'password' | 'salt'>;

export interface IAuthSignUp {
    user: IUserWithoutSecret;
    token: string;
}