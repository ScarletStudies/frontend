import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { IPaginatedResponse, IPost, IPostQueryParameters, IComment } from '../models';

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

        return this.http.get<IPaginatedResponse<IPost>>(`${environment.api}/posts/`, { params });
    }

    getOne(id: string): Observable<IPost> {
        return this.http.get<IPost>(`${environment.api}/posts/${id}`);
    }

    addPost(post: Partial<IPost>): Observable<IPost> {
        return this.http.post<IPost>(`${environment.api}/posts/`, post);
    }

    addCheer(post: IPost): Observable<IPost> {
        return this.http.post<IPost>(`${environment.api}/posts/${post.id}/cheers/`, '');
    }

    addComment(post: IPost, comment: IComment): Observable<IPost> {
        return this.http.post<IPost>(`${environment.api}/posts/${post.id}/comments/`, comment);
    }

    constructor(private http: HttpClient) { }
}
