export interface IUser {
    readonly email: string;
}

export interface IAuthUser extends IUser {
    readonly jwt: string;
}

export const DEFAULT_USER_STATE: IAuthUser = {
    email: null,
    jwt: null
};
