import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import * as UserActions from '../actions/user.actions';
import * as RouterActions from '../actions/router.actions';
import { IAuthUser } from '../models';

@Injectable()
export class UserEffects {
    @Effect()
    login$: Observable<Action> = this.actions$.pipe(
        ofType(UserActions.ActionTypes.LOGIN_ATTEMPT),
        mergeMap(
            (action: UserActions.AttemptLoginAction) =>
                this.http.post(`${environment.api}/users/login`, action.payload)
                    .pipe(
                        // If successful, dispatch success action with result
                        mergeMap(
                            (data: IAuthUser) => from(
                                [
                                    new UserActions.LoginSuccessAction(data),
                                    new RouterActions.Go({ path: ['/dashboard'] })
                                ]
                            )
                        ),
                        // If request fails, dispatch failed action
                        catchError(err => of(new UserActions.LoginFailedAction(err)))
                    )
        )
    );

    constructor(private http: HttpClient, private actions$: Actions) { }
}
