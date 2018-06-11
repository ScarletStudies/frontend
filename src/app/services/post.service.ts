import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import * as moment from 'moment';

import { IPaginatedResponse, IPost, IPostQueryParameters, IComment } from '../models';

function localize(post: IPost): IPost {
    return {
        ...post,
        comments: post.comments.map(c => ({ ...c, timestamp: moment.utc(c.timestamp).local().toDate() })),
        timestamp: moment.utc(post.timestamp).local().toDate()
    };
}

@Injectable({
    providedIn: 'root'
})
export class PostService {

    getAll(queryParams: IPostQueryParameters): Observable<IPaginatedResponse<IPost>> {
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

        for (const key of ['page', 'query', 'sort', 'start_date', 'end_date']) {
            if (key in queryParams) {
                params = params.set(key, `${queryParams[key]}`);
            }
        }

        return this.http
            .get<IPaginatedResponse<IPost>>(`${environment.api}/posts/`, { params })
            .pipe(
                map(
                    paginated_posts => ({
                        ...paginated_posts,
                        items: paginated_posts.items.map(localize)
                    })
                )
            );
    }

    getOne(id: string): Observable<IPost> {
        return this.http
            .get<IPost>(`${environment.api}/posts/${id}`)
            .pipe(
                map(
                    localize
                )
            );
    }

    addPost(post: Partial<IPost>): Observable<IPost> {
        return this.http.post<IPost>(`${environment.api}/posts/`, post);
    }

    addCheer(post: IPost): Observable<IPost> {
        return this.http
            .post<IPost>(`${environment.api}/posts/${post.id}/cheers/`, '')
            .pipe(
                map(
                    localize
                )
            );

    }

    addComment(post: IPost, comment: IComment): Observable<IPost> {
        return this.http
            .post<IPost>(`${environment.api}/posts/${post.id}/comments/`, comment)
            .pipe(
                map(
                    localize
                )
            );
    }

    constructor(private http: HttpClient) { }
}
