import { ActionReducerMap } from '@ngrx/store';
import { userReducer } from './user.reducer';
import { scheduleReducer } from './schedule.reducer';
import { IAppState } from '../models';

/**********
* Reducer Map
********/

export const reducers: ActionReducerMap<IAppState> = {
    user: userReducer,
    schedule: scheduleReducer
};
