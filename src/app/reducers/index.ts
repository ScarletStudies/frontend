import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

import { userReducer } from './user.reducer';
import { scheduleReducer } from './schedule.reducer';
import { postReducer } from './post.reducer';

import { IAppState } from '../models';

/**********
* Reducer Map
********/

export const reducers: ActionReducerMap<IAppState> = {
    user: userReducer,
    schedule: scheduleReducer,
    posts: postReducer,
    router: routerReducer
};
