import { Action } from '@ngrx/store';
import { ICourse } from '../models';

/**********
* Schedule Actions
********/

export enum ActionTypes {
    GET_COURSES_ATTEMPT = '[Schedule] Get Courses Attempt',
    GET_COURSES_FAILED = '[Schedule] Get Courses Failed',
    ADD_COURSE_ATTEMPT = '[Schedule] Add Course Attempt',
    ADD_COURSE_FAILED = '[Schedule] Add Course Failed',
    REMOVE_COURSE_ATTEMPT = '[Schedule] Remove Course Attempt',
    REMOVE_COURSE_FAILED = '[Schedule] Remove Course Failed',

    SET_COURSES = '[Schedule] Set Courses'
}

export class SetCoursesAction implements Action {
    readonly type = ActionTypes.SET_COURSES;

    constructor(public payload: ICourse[]) { }
}

export class AddCourseAttemptAction implements Action {
    readonly type = ActionTypes.ADD_COURSE_ATTEMPT;

    constructor(public payload: string) { }
}

export class AddCourseFailedAction implements Action {
    readonly type = ActionTypes.ADD_COURSE_FAILED;
    readonly error = true;

    constructor(public payload: { message: string }) { }
}

export class RemoveCourseAttemptAction implements Action {
    readonly type = ActionTypes.REMOVE_COURSE_ATTEMPT;

    constructor(public payload: string) { }
}

export class RemoveCourseFailedAction implements Action {
    readonly type = ActionTypes.REMOVE_COURSE_FAILED;
    readonly error = true;

    constructor(public payload: { message: string }) { }
}

export class GetCoursesAttemptAction implements Action {
    readonly type = ActionTypes.GET_COURSES_ATTEMPT;

    constructor() { }
}

export class GetCoursesFailedAction implements Action {
    readonly type = ActionTypes.GET_COURSES_FAILED;
    readonly error = true;

    constructor(public payload: { message: string }) { }
}

export type Actions = AddCourseAttemptAction
    | SetCoursesAction
    | AddCourseFailedAction
    | RemoveCourseAttemptAction
    | RemoveCourseFailedAction
    | GetCoursesAttemptAction
    | GetCoursesFailedAction;

