import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { tap, filter } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

interface ErrorAction extends Action {
    error: boolean;
    payload: {
        error?: {
            message: string;
        };
        message: string;
    };
}

@Injectable()
export class ErrorEffects {

    @Effect({ dispatch: false })
    display$ = this.actions$.pipe(
        filter((action: ErrorAction) => action.error),
        tap(
            (action: ErrorAction) => {
                let message = action.payload.message;

                try {
                    message = action.payload.error.message;
                } catch (e) { }

                this.toastr.error(message, null, { timeOut: 0 });
            }
        )
    );


    constructor(private actions$: Actions,
        private toastr: ToastrService) { }
}
