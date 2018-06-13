import { IUser } from '.';

export interface IComment {
    readonly id: string;
    readonly timestamp: string | Date;
    readonly content: string;
    readonly author: IUser;
}
