import { Action, ActionReducerMap } from '@ngrx/store';

export interface IUser {
    email: string;
    jwt: string;
}

export interface IAppState {
    user: IUser;
}

export enum UserActionTypes {
    DO_LOGIN = '[User] Do Login',
    LOGIN_SUCCESSFUL = '[User] Login Successful',
    DO_LOGOUT = '[User] Do Logout'
}

export class DoLoginAction implements Action {
    readonly type = UserActionTypes.DO_LOGIN;

    constructor(public payload: IUser) { }
}

export class LoginSuccessAction implements Action {
    readonly type = UserActionTypes.LOGIN_SUCCESSFUL;

    constructor(public payload: IUser) { }
}

export class DoLogoutAction implements Action {
    readonly type = UserActionTypes.DO_LOGOUT;
}

export type UserActions = DoLoginAction | LoginSuccessAction | DoLogoutAction;

export function userReducer(state: IUser = null, action: UserActions): IUser {
    switch (action.type) {
        case UserActionTypes.LOGIN_SUCCESSFUL:
            return action.payload;
        case UserActionTypes.DO_LOGOUT:
            return null;
    }

    return state;
}

export const reducers: ActionReducerMap<IAppState> = {
    user: userReducer
};
