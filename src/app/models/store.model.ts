import { RouterReducerState } from '@ngrx/router-store';

import {
    IUser,
    ICourse
} from '.';

export interface IAppState {
    user: IUser;
    schedule: ICourse[];
    router: RouterReducerState;
}
