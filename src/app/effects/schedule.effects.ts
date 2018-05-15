import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as ScheduleActions from '../actions/schedule.actions';
import { ICourse } from '../models';

@Injectable()
export class ScheduleEffects {
    @Effect()
    addCourse$: Observable<Action> = this.actions$.pipe(
        ofType(ScheduleActions.ActionTypes.ADD_COURSE_ATTEMPT),
        mergeMap(
            (action: ScheduleActions.AddCourseAttemptAction) =>
                this.http.post(`http://localhost:5000/users/courses/${action.payload}`, '')
                    .pipe(
                        // If successful, dispatch success action with result
                        map(
                            (data: ICourse[]) => new ScheduleActions.SetCoursesAction(data)
                        ),
                        // If request fails, dispatch failed action
                        catchError(err => of(new ScheduleActions.AddCourseFailedAction(err.message)))
                    )
        )
    );

    @Effect()
    removeCourse$: Observable<Action> = this.actions$.pipe(
        ofType(ScheduleActions.ActionTypes.REMOVE_COURSE_ATTEMPT),
        mergeMap(
            (action: ScheduleActions.RemoveCourseAttemptAction) =>
                this.http.delete(`http://localhost:5000/users/courses/${action.payload}`)
                    .pipe(
                        // If successful, dispatch success action with result
                        map(
                            (data: ICourse[]) => new ScheduleActions.SetCoursesAction(data)
                        ),
                        // If request fails, dispatch failed action
                        catchError(err => of(new ScheduleActions.RemoveCourseFailedAction(err.message)))
                    )
        )
    );

    @Effect()
    getCourses$: Observable<Action> = this.actions$.pipe(
        ofType(ScheduleActions.ActionTypes.GET_COURSES_ATTEMPT),
        mergeMap(
            (action: ScheduleActions.GetCoursesAttemptAction) =>
                this.http.get(`http://localhost:5000/users/courses/`)
                    .pipe(
                        // If successful, dispatch success action with result
                        map(
                            (data: ICourse[]) => new ScheduleActions.SetCoursesAction(data)
                        ),
                        // If request fails, dispatch failed action
                        catchError(err => of(new ScheduleActions.GetCoursesFailedAction(err.message)))
                    )
        )
    );

    constructor(private http: HttpClient, private actions$: Actions) { }
}
