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
    IUser
} from './app.actions';

import * as RouterActions from './router.actions';

@Injectable()
export class AuthEffects {
    @Effect()
    login$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.ATTEMPT_LOGIN),
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
