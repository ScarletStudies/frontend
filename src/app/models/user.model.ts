export interface IUser {
    readonly email: string;
}

export interface IAuthUser extends IUser {
    readonly jwt: string;
    readonly redirectUrl: string;
}

export const DEFAULT_USER_STATE: IAuthUser = {
    email: null,
    jwt: null,
    redirectUrl: null
};
