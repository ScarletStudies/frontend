import { Action } from '@ngrx/store';
import { ICourse } from '../models';
import * as ScheduleActions from '../actions/schedule.actions';

/**********
* Schedule Reducer
********/

export function scheduleReducer(state: ICourse[] = [], action: ScheduleActions.Actions): ICourse[] {
    switch (action.type) {
        case ScheduleActions.ActionTypes.SET_COURSES:
            return action.payload;
    }

    return state;
}

