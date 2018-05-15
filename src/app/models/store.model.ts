import {
    IUser,
    ICourse
} from '.';

export interface IAppState {
    user: IUser;
    schedule: ICourse[];
}
