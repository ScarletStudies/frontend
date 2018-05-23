import { Action } from '@ngrx/store';

/**********
* User Actions
********/

export class ErrorAction implements Action {
    readonly type = '[Error] Error!';
    readonly error = 'Something bad happened!';

    constructor(public readonly payload) { }
}
