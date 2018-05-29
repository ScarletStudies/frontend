import { RouterReducerState } from '@ngrx/router-store';

import {
    IAuthUser,
    ICourse,
} from '.';

export interface IAppState {
    user: IAuthUser;
    schedule: ICourse[];
    router: RouterReducerState;
}
