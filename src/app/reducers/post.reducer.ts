import { Action } from '@ngrx/store';
import { IPost } from '../models';
import * as PostActions from '../actions/post.actions';

/**********
* Post Reducer
********/

export function postReducer(state: IPost[] = [], action: PostActions.Actions): IPost[] {
    switch (action.type) {
        case PostActions.ActionTypes.SET_POSTS:
            return action.payload;
        case PostActions.ActionTypes.ADD_POST:
            return [
                action.payload,
                ...state
            ];
        case PostActions.ActionTypes.UPDATE_POST:
            return state.map(
                post => post.id === action.payload.id ? action.payload : post
            );
    }

    return state;
}

