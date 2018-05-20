import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import * as PostActions from '../actions/post.actions';
import { IPost } from '../models';

@Injectable()
export class PostEffects {
    @Effect()
    getAll$: Observable<Action> = this.actions$.pipe(
        ofType(PostActions.ActionTypes.GET_POSTS_ATTEMPT),
        mergeMap(
            (action: PostActions.GetPostsAttemptAction) => {
                const queryParams = action.payload;
                let params = new HttpParams();

                if (queryParams.courses) {
                    for (const course of queryParams.courses) {
                        params = params.append('courses[]', course.id);
                    }
                }

                if (queryParams.categories) {
                    for (const category of queryParams.categories) {
                        params = params.append('categories[]', category.id);
                    }
                }

                if (queryParams.limit) {
                    params = params.set('limit', `${queryParams.limit}`);
                }

                if (queryParams.offset) {
                    params = params.set('offset', `${queryParams.offset}`);
                }

                if (queryParams.query) {
                    params = params.set('query', queryParams.query);
                }

                return this.http.get(`${environment.api}/posts/`, { params })
                    .pipe(
                        // If successful, dispatch success action with result
                        map(
                            (data: IPost[]) => new PostActions.SetPostsAction(data)
                        ),
                        // If request fails, dispatch failed action
                        catchError(err => of(new PostActions.GetPostsFailedAction(err)))
                    );
            }
        )
    );

    @Effect()
    addPost$: Observable<Action> = this.actions$.pipe(
        ofType(PostActions.ActionTypes.CREATE_POST_ATTEMPT),
        mergeMap(
            (action: PostActions.CreatePostAttemptAction) =>
                this.http.post(`${environment.api}/posts/`, action.payload)
                    .pipe(
                        // If successful, dispatch success action with result
                        map(
                            (data: IPost) => new PostActions.AddPostAction(data)
                        ),
                        // If request fails, dispatch failed action
                        catchError(err => of(new PostActions.CreatePostFailedAction(err)))
                    )
        )
    );

    @Effect()
    addCheer$: Observable<Action> = this.actions$.pipe(
        ofType(PostActions.ActionTypes.CHEER_POST_ATTEMPT),
        mergeMap(
            (action: PostActions.CheerPostAttemptAction) =>
                this.http.post(`${environment.api}/posts/${action.payload.id}/cheers/`, '')
                    .pipe(
                        // If successful, dispatch success action with result
                        map(
                            (data: IPost) => new PostActions.UpdatePostAction(data)
                        ),
                        // If request fails, dispatch failed action
                        catchError(err => of(new PostActions.CheerPostFailedAction(err)))
                    )
        )
    );

    @Effect()
    addComment$: Observable<Action> = this.actions$.pipe(
        ofType(PostActions.ActionTypes.COMMENT_POST_ATTEMPT),
        mergeMap(
            (action: PostActions.CommentPostAttemptAction) =>
                this.http.post(`${environment.api}/posts/${action.payload.post.id}/comments/`, action.payload.comment)
                    .pipe(
                        // If successful, dispatch success action with result
                        map(
                            (data: IPost) => new PostActions.UpdatePostAction(data)
                        ),
                        // If request fails, dispatch failed action
                        catchError(err => of(new PostActions.CommentPostFailedAction(err)))
                    )
        )
    );

    constructor(private http: HttpClient,
        private actions$: Actions,
        private sanitizer: DomSanitizer) { }
}
