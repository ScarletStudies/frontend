import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { tap, filter } from 'rxjs/operators';

import { AlertService } from '../services';

interface ErrorAction extends Action {
    error: string;
    payload: {
        error?: {
            message: string;
        };
    };
}

@Injectable()
export class ErrorEffects {

    @Effect({ dispatch: false })
    display$ = this.actions$.pipe(
        filter((action: ErrorAction) => !!action.error),
        tap(
            (action: ErrorAction) => {
                let message = action.error;

                if (action.payload && action.payload.error && action.payload.error.message) {
                    message = action.payload.error.message;
                }

                this.alertService.error(message);
            }
        )
    );


    constructor(private actions$: Actions,
        private alertService: AlertService) { }
}
