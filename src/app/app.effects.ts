import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import {
    UserActions,
    UserActionTypes,
    AttemptLoginAction,
    LoginSuccessAction,
    LoginFailedAction,
    IUser,
    ICourse,
    ScheduleActionTypes,
    ScheduleAddCourseAttemptAction,
    ScheduleAddCourseSuccessAction,
    ScheduleAddCourseFailedAction,
    ScheduleRemoveCourseAttemptAction,
    ScheduleRemoveCourseSuccessAction,
    ScheduleRemoveCourseFailedAction,
    ScheduleGetCoursesAttemptAction,
    ScheduleGetCoursesSuccessAction,
    ScheduleGetCoursesFailedAction
} from './app.actions';

import * as RouterActions from './router.actions';

@Injectable()
export class AuthEffects {
    @Effect()
    login$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.LOGIN_ATTEMPT),
        mergeMap(
            (action: AttemptLoginAction) =>
                this.http.post('http://localhost:5000/users/login', action.payload)
                    .pipe(
                        // If successful, dispatch success action with result
                        mergeMap(
                            (data: IUser) => from(
                                [
                                    new LoginSuccessAction(data),
                                    new RouterActions.Go({ path: ['/dashboard'] })
                                ]
                            )
                        ),
                        // If request fails, dispatch failed action
                        catchError(err => of(new LoginFailedAction(err.message)))
                    )
        )
    );

    constructor(private http: HttpClient, private actions$: Actions) { }
}

@Injectable()
export class ScheduleEffects {
    @Effect()
    addCourse$: Observable<Action> = this.actions$.pipe(
        ofType(ScheduleActionTypes.ADD_COURSE_ATTEMPT),
        mergeMap(
            (action: ScheduleAddCourseAttemptAction) =>
                this.http.post(`http://localhost:5000/users/courses/${action.payload}`, '')
                    .pipe(
                        // If successful, dispatch success action with result
                        map(
                            (data: ICourse[]) => new ScheduleAddCourseSuccessAction(data)
                        ),
                        // If request fails, dispatch failed action
                        catchError(err => of(new ScheduleAddCourseFailedAction(err.message)))
                    )
        )
    );

    @Effect()
    removeCourse$: Observable<Action> = this.actions$.pipe(
        ofType(ScheduleActionTypes.REMOVE_COURSE_ATTEMPT),
        mergeMap(
            (action: ScheduleRemoveCourseAttemptAction) =>
                this.http.delete(`http://localhost:5000/users/courses/${action.payload}`)
                    .pipe(
                        // If successful, dispatch success action with result
                        map(
                            (data: ICourse[]) => new ScheduleRemoveCourseSuccessAction(data)
                        ),
                        // If request fails, dispatch failed action
                        catchError(err => of(new ScheduleRemoveCourseFailedAction(err.message)))
                    )
        )
    );

    @Effect()
    getCourses$: Observable<Action> = this.actions$.pipe(
        ofType(ScheduleActionTypes.GET_COURSES_ATTEMPT),
        mergeMap(
            (action: ScheduleGetCoursesAttemptAction) =>
                this.http.get(`http://localhost:5000/users/courses/`)
                    .pipe(
                        // If successful, dispatch success action with result
                        map(
                            (data: ICourse[]) => new ScheduleGetCoursesSuccessAction(data)
                        ),
                        // If request fails, dispatch failed action
                        catchError(err => of(new ScheduleGetCoursesFailedAction(err.message)))
                    )
        )
    );

    constructor(private http: HttpClient, private actions$: Actions) { }
}
