import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { catchError, mergeMap, withLatestFrom } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import * as UserActions from '../actions/user.actions';
import * as RouterActions from '../actions/router.actions';
import { IAuthUser, IAppState } from '../models';

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

                        // check for redirect url
                        withLatestFrom<IAuthUser, string>(this.store.pipe(select(state => state.user.redirectUrl))),
                        mergeMap(
                            ([data, redirectUrl]: [IAuthUser, String]) => from(
                                [
                                    new UserActions.LoginSuccessAction(data),
                                    new RouterActions.Go(
                                        { path: redirectUrl ? [redirectUrl] : ['/dashboard'] }
                                    )
                                ]
                            )
                        ),
                        // If request fails, dispatch failed action
                        catchError(err => of(new UserActions.LoginFailedAction(err)))
                    )
        )
    );

    constructor(private http: HttpClient,
        private actions$: Actions,
        private store: Store<IAppState>) { }
}
