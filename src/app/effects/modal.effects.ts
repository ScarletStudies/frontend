import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import * as PostActions from '../actions/post.actions';

@Injectable()
export class ModalEffects {
    @Effect({ dispatch: false })
    display$ = this.actions$.pipe(
        ofType(PostActions.ActionTypes.CREATE_POST_SUCCESS),
        tap(
            (action: PostActions.CreatePostSuccessAction) => {
                action.payload.modal.close();
            }
        )
    );


    constructor(private actions$: Actions) { }
}
