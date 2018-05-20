import { Action } from '@ngrx/store';
import { IPost, IPostQueryParameters, IComment } from '../models';

/**********
* Post Actions
********/

export enum ActionTypes {
    // success results in set_posts
    GET_POSTS_ATTEMPT = '[Post] Get Posts Attempt',
    GET_POSTS_FAILED = '[Post] Get Posts Failed',

    // success results in add_post
    CREATE_POST_ATTEMPT = '[Post] Add Post Attempt',
    CREATE_POST_FAILED = '[Post] Add Post Failed',

    // success results in update_post
    CHEER_POST_ATTEMPT = '[Post] Cheer Post Attempt',
    CHEER_POST_FAILED = '[Post] Cheer Post Failed',

    // success results in update_post
    COMMENT_POST_ATTEMPT = '[Post] Comment Post Attempt',
    COMMENT_POST_FAILED = '[Post] Comment Post Failed',

    ADD_POST = '[Post] Add Post',
    UPDATE_POST = '[Post] Update Post',
    SET_POSTS = '[Post] Set Post'
}

export class SetPostsAction implements Action {
    readonly type = ActionTypes.SET_POSTS;

    constructor(public payload: IPost[]) { }
}

export class AddPostAction implements Action {
    readonly type = ActionTypes.ADD_POST;

    constructor(public payload: IPost) { }
}

export class UpdatePostAction implements Action {
    readonly type = ActionTypes.UPDATE_POST;

    constructor(public payload: IPost) { }
}

export class CreatePostAttemptAction implements Action {
    readonly type = ActionTypes.CREATE_POST_ATTEMPT;

    constructor(public payload: Partial<IPost>) { }
}

export class CreatePostFailedAction implements Action {
    readonly type = ActionTypes.CREATE_POST_FAILED;

    readonly error = 'Create post failed';

    constructor(public payload: { message: string }) { }
}

export class CheerPostAttemptAction implements Action {
    readonly type = ActionTypes.CHEER_POST_ATTEMPT;

    constructor(public payload: IPost) { }
}

export class CheerPostFailedAction implements Action {
    readonly type = ActionTypes.CHEER_POST_FAILED;
    readonly error = 'Cheer post failed';

    constructor(public payload: { message: string }) { }
}

export class CommentPostAttemptAction implements Action {
    readonly type = ActionTypes.COMMENT_POST_ATTEMPT;

    constructor(public payload: { post: Partial<IPost>, comment: Partial<IComment> }) { }
}

export class CommentPostFailedAction implements Action {
    readonly type = ActionTypes.COMMENT_POST_FAILED;
    readonly error = 'Comment failed';

    constructor(public payload: { message: string }) { }
}

export class GetPostsAttemptAction implements Action {
    readonly type = ActionTypes.GET_POSTS_ATTEMPT;

    constructor(public payload: IPostQueryParameters = {}) { }
}

export class GetPostsFailedAction implements Action {
    readonly type = ActionTypes.GET_POSTS_FAILED;
    readonly error = 'Get posts failed';

    constructor(public payload: { message: string }) { }
}

export type Actions = SetPostsAction
    | AddPostAction
    | UpdatePostAction
    | CreatePostAttemptAction
    | CreatePostFailedAction
    | CheerPostAttemptAction
    | CheerPostFailedAction
    | CommentPostAttemptAction
    | CommentPostFailedAction
    | GetPostsAttemptAction
    | GetPostsFailedAction;


