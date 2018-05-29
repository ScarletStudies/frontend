import { Action } from '@ngrx/store';
import {
    IAuthUser,
    DEFAULT_USER_STATE
} from '../models';
import * as UserActions from '../actions/user.actions';

/**********
* User Reducer
********/

export function userReducer(state: IAuthUser = DEFAULT_USER_STATE, action: UserActions.Actions): IAuthUser {
    switch (action.type) {
        case UserActions.ActionTypes.LOGIN_SUCCESS:
            return action.payload;
        case UserActions.ActionTypes.REFRESH:
            return {
                ...state,
                jwt: action.payload
            };
        case UserActions.ActionTypes.SET_REDIRECT_URL:
            return {
                ...state,
                redirectUrl: action.payload
            };
        case UserActions.ActionTypes.LOGOUT:
            return DEFAULT_USER_STATE;
    }

    return state;
}
