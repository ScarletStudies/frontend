import { Action } from '@ngrx/store';
import {
    IUser,
    DEFAULT_USER_STATE
} from '../models';
import * as UserActions from '../actions/user.actions';

/**********
* User Reducer
********/

export function userReducer(state: IUser = DEFAULT_USER_STATE, action: UserActions.Actions): IUser {
    switch (action.type) {
        case UserActions.ActionTypes.LOGIN_SUCCESS:
            return action.payload;
    }

    return state;
}
