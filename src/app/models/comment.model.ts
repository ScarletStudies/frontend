import { IUser } from '.';

export interface IComment {
    readonly timestamp: string;
    readonly content: string;
    readonly author: IUser;
}
