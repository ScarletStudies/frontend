import { Action, ActionReducerMap } from '@ngrx/store';

/**********
* State
********/

export interface IUser {
    email: string;
    jwt: string;
}

const DEFAULT_USER_STATE: IUser = {
    email: null,
    jwt: null
};

export interface ICourse {
    id: string;
    name: string;
    offering_unit: string;
    subject: string;
    course_number: string;
}

export interface IAppState {
    user: IUser;
    schedule: ICourse[];
}

/**********
* User Actions
********/

export enum UserActionTypes {
    LOGIN_ATTEMPT = '[User] Attempt Login',
    LOGIN_SUCCESS = '[User] Do Login',
    LOGIN_FAILED = '[User] Fail Login',
    DO_LOGOUT = '[User] Do Logout'
}

export class AttemptLoginAction implements Action {
    readonly type = UserActionTypes.LOGIN_ATTEMPT;

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

export function userReducer(state: IUser = DEFAULT_USER_STATE, action: UserActions): IUser {
    switch (action.type) {
        case UserActionTypes.LOGIN_SUCCESS:
            return action.payload;
        case UserActionTypes.DO_LOGOUT:
            return null;
    }

    return state;
}

/**********
* Schedule Actions
********/

export enum ScheduleActionTypes {
    GET_COURSES_ATTEMPT = '[Schedule] Get Courses Attempt',
    GET_COURSES_SUCCESS = '[Schedule] Get Courses Success',
    GET_COURSES_FAILED = '[Schedule] Get Courses Failed',
    ADD_COURSE_ATTEMPT = '[Schedule] Add Course Attempt',
    ADD_COURSE_SUCCESS = '[Schedule] Add Course Success',
    ADD_COURSE_FAILED = '[Schedule] Add Course Failed',
    REMOVE_COURSE_ATTEMPT = '[Schedule] Remove Course Attempt',
    REMOVE_COURSE_SUCCESS = '[Schedule] Remove Course Success',
    REMOVE_COURSE_FAILED = '[Schedule] Remove Course Failed',
}

export class ScheduleAddCourseAttemptAction implements Action {
    readonly type = ScheduleActionTypes.ADD_COURSE_ATTEMPT;

    constructor(public payload: string) { }
}

export class ScheduleAddCourseSuccessAction implements Action {
    readonly type = ScheduleActionTypes.ADD_COURSE_SUCCESS;

    constructor(public payload: ICourse[]) { }
}

export class ScheduleAddCourseFailedAction implements Action {
    readonly type = ScheduleActionTypes.ADD_COURSE_FAILED;

    constructor(public payload: { message: string }) { }
}

export class ScheduleRemoveCourseAttemptAction implements Action {
    readonly type = ScheduleActionTypes.REMOVE_COURSE_ATTEMPT;

    constructor(public payload: string) { }
}

export class ScheduleRemoveCourseSuccessAction implements Action {
    readonly type = ScheduleActionTypes.REMOVE_COURSE_SUCCESS;

    constructor(public payload: ICourse[]) { }
}

export class ScheduleRemoveCourseFailedAction implements Action {
    readonly type = ScheduleActionTypes.REMOVE_COURSE_FAILED;

    constructor(public payload: { message: string }) { }
}

export class ScheduleGetCoursesAttemptAction implements Action {
    readonly type = ScheduleActionTypes.GET_COURSES_ATTEMPT;

    constructor() { }
}

export class ScheduleGetCoursesSuccessAction implements Action {
    readonly type = ScheduleActionTypes.GET_COURSES_SUCCESS;

    constructor(public payload: ICourse[]) { }
}

export class ScheduleGetCoursesFailedAction implements Action {
    readonly type = ScheduleActionTypes.GET_COURSES_FAILED;

    constructor(public payload: { message: string }) { }
}

export type ScheduleActions = ScheduleAddCourseAttemptAction
    | ScheduleAddCourseSuccessAction
    | ScheduleAddCourseFailedAction
    | ScheduleRemoveCourseAttemptAction
    | ScheduleRemoveCourseSuccessAction
    | ScheduleRemoveCourseFailedAction
    | ScheduleGetCoursesAttemptAction
    | ScheduleGetCoursesSuccessAction
    | ScheduleGetCoursesFailedAction;

/**********
* Schedule Reducer
********/

export function scheduleReducer(state: ICourse[] = [], action: ScheduleActions): ICourse[] {
    switch (action.type) {
        case ScheduleActionTypes.ADD_COURSE_SUCCESS:
        case ScheduleActionTypes.REMOVE_COURSE_SUCCESS:
        case ScheduleActionTypes.GET_COURSES_SUCCESS:
            return action.payload;
    }

    return state;
}

/**********
* Reducer Map
********/

export const reducers: ActionReducerMap<IAppState> = {
    user: userReducer,
    schedule: scheduleReducer
};
