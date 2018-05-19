import { RouterReducerState } from '@ngrx/router-store';

import {
    IUser,
    ICourse,
    IPost
} from '.';

export interface IAppState {
    user: IUser;
    schedule: ICourse[];
    posts: IPost[];
    router: RouterReducerState;
}
