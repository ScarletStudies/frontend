import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

import * as UserActions from '../actions/user.actions';
import * as RouterActions from '../actions/router.actions';
import { IUser } from '../models';

@Injectable()
export class UserEffects {
    @Effect()
    login$: Observable<Action> = this.actions$.pipe(
        ofType(UserActions.ActionTypes.LOGIN_ATTEMPT),
        mergeMap(
            (action: UserActions.AttemptLoginAction) =>
                this.http.post('http://localhost:5000/users/login', action.payload)
                    .pipe(
                        // If successful, dispatch success action with result
                        mergeMap(
                            (data: IUser) => from(
                                [
                                    new UserActions.LoginSuccessAction(data),
                                    new RouterActions.Go({ path: ['/dashboard'] })
                                ]
                            )
                        ),
                        // If request fails, dispatch failed action
                        catchError(err => of(new UserActions.LoginFailedAction(err.message)))
                    )
        )
    );

    constructor(private http: HttpClient, private actions$: Actions) { }
}
