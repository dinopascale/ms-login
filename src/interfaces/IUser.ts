export interface IUser {
    _id?: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    salt: string;
}

export interface IUserInputSignUp {
    name: string;
    surname: string;
    email: string;
    password: string;
}

export interface IUserInputSignIn {
    email: string;
    password: string;
}