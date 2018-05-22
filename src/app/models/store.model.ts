import { RouterReducerState } from '@ngrx/router-store';

import {
    IAuthUser,
    ICourse,
    IPost
} from '.';

export interface IAppState {
    user: IAuthUser;
    schedule: ICourse[];
    posts: IPost[];
    router: RouterReducerState;
}
