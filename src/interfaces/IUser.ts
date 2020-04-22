export interface IUser {
    _id?: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    salt: string;
}

export interface IUserInput {
    name: string;
    surname: string;
    email: string;
    password: string;
}