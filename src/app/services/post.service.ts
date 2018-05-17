import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { IPost, IPostWithComments, ICourse, ICategory } from '../models';

export interface IPostQueryParameters {
    courses?: ICourse[];
    categories?: ICategory[];
    query?: string;
    limit?: number;
    offset?: number;
}

@Injectable({
    providedIn: 'root'
})
export class PostService {
    constructor(private http: HttpClient) { }

    public one(id: string): Observable<IPostWithComments> {
        return this.http
            .get<IPostWithComments>(
                `${environment.api}/posts/${id}`
            );
    }


    public comment(post_id: string, content: string): Observable<void> {
        return this.http
            .post<void>(
                `${environment.api}/posts/${post_id}/comments/`,
                { content }
            );
    }

    public many(queryParams: IPostQueryParameters = {}): Observable<IPost[]> {
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

        return this.http
            .get<IPost[]>(
                `${environment.api}/posts/`,
                { params }
            );
    }

    public add(title: string, content: string, course_id: string, category_id: string): Observable<void> {
        return this.http
            .post<void>(
                `${environment.api}/posts/`,
                { title, content, course_id, category_id }
            );
    }
}
