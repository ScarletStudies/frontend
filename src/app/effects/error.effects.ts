import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { tap, filter } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

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

                if (action.payload.error && action.payload.error.message) {
                    message = action.payload.error.message;
                }

                this.toastr.error(message, null, { timeOut: 0 });
            }
        )
    );


    constructor(private actions$: Actions,
        private toastr: ToastrService) { }
}
