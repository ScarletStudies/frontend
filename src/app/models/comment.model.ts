import { IUser } from '.';

export interface IComment {
    readonly timestamp: string | Date;
    readonly content: string;
    readonly author: IUser;
}
