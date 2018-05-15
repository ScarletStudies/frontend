import { Action, ActionReducerMap } from '@ngrx/store';

/**********
* State
********/

export interface IUser {
    email: string;
    jwt: string;
}

export interface ICourse {
    id: string;
    name: string;
    offering_unit: string;
    subject: string;
    course_number: string;
}

export interface IAppState {
    user: IUser;
}

/**********
* User Actions
********/

export enum UserActionTypes {
    ATTEMPT_LOGIN = '[User] Attempt Login',
    LOGIN_SUCCESS = '[User] Do Login',
    LOGIN_FAILED = '[User] Fail Login',
    DO_LOGOUT = '[User] Do Logout'
}

export class AttemptLoginAction implements Action {
    readonly type = UserActionTypes.ATTEMPT_LOGIN;

    constructor(public payload: { email: string, password: string }) { }
}

export class LoginSuccessAction implements Action {
    readonly type = UserActionTypes.LOGIN_SUCCESS;

    constructor(public payload: IUser) { }
}

export class LoginFailedAction implements Action {
    readonly type = UserActionTypes.LOGIN_FAILED;

    constructor(public payload: { message: string }) { }
}

export class DoLogoutAction implements Action {
    readonly type = UserActionTypes.DO_LOGOUT;
}

export type UserActions = AttemptLoginAction | LoginSuccessAction | LoginFailedAction | DoLogoutAction;

/**********
* User Reducer
********/

export function userReducer(state: IUser = null, action: UserActions): IUser {
    switch (action.type) {
        case UserActionTypes.LOGIN_SUCCESS:
            return action.payload;
        case UserActionTypes.DO_LOGOUT:
            return null;
    }

    return state;
}

/**********
* Reducer Map
********/

export const reducers: ActionReducerMap<IAppState> = {
    user: userReducer
};
