import { Action } from '@ngrx/store';
import { IAuthUser } from '../models';

/**********
* User Actions
********/

export enum ActionTypes {
    LOGIN_ATTEMPT = '[User] Attempt Login',
    LOGIN_SUCCESS = '[User] Do Login',
    LOGIN_FAILED = '[User] Fail Login',
    SET_REDIRECT_URL = '[User] Set Redirect Url',
    LOGOUT = '[User] Logout',
    REFRESH = '[User] Refresh'
}

export class AttemptLoginAction implements Action {
    readonly type = ActionTypes.LOGIN_ATTEMPT;

    constructor(public payload: { email: string, password: string }) { }
}

export class LoginSuccessAction implements Action {
    readonly type = ActionTypes.LOGIN_SUCCESS;

    constructor(public payload: IAuthUser) { }
}

export class LoginFailedAction implements Action {
    readonly type = ActionTypes.LOGIN_FAILED;
    readonly error = 'Login failed';

    constructor(public payload: { message: string }) { }
}

export class LogoutAction implements Action {
    readonly type = ActionTypes.LOGOUT;
}

export class RefreshJwtAction implements Action {
    readonly type = ActionTypes.REFRESH;

    constructor(public payload: string) { }
}

export class SetRedirectUrlAction implements Action {
    readonly type = ActionTypes.SET_REDIRECT_URL;

    constructor(public payload: string) { }
}

export type Actions = AttemptLoginAction |
    LoginSuccessAction |
    LoginFailedAction |
    LogoutAction |
    RefreshJwtAction |
    SetRedirectUrlAction;
