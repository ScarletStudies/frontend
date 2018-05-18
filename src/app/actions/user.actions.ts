import { Action } from '@ngrx/store';
import { IUser } from '../models';

/**********
* User Actions
********/

export enum ActionTypes {
    LOGIN_ATTEMPT = '[User] Attempt Login',
    LOGIN_SUCCESS = '[User] Do Login',
    LOGIN_FAILED = '[User] Fail Login',
    LOGOUT = '[User] Logout'
}

export class AttemptLoginAction implements Action {
    readonly type = ActionTypes.LOGIN_ATTEMPT;

    constructor(public payload: { email: string, password: string }) { }
}

export class LoginSuccessAction implements Action {
    readonly type = ActionTypes.LOGIN_SUCCESS;

    constructor(public payload: IUser) { }
}

export class LoginFailedAction implements Action {
    readonly type = ActionTypes.LOGIN_FAILED;
    readonly error = true;

    constructor(public payload: { message: string }) { }
}

export class LogoutAction implements Action {
    readonly type = ActionTypes.LOGOUT;
}

export type Actions = AttemptLoginAction | LoginSuccessAction | LoginFailedAction | LogoutAction;
