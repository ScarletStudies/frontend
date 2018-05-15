export interface IUser {
    readonly email: string;
    readonly jwt: string;
}

export const DEFAULT_USER_STATE: IUser = {
    email: null,
    jwt: null
};
