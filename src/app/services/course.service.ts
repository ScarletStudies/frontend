import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { ICourse } from '../models';

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    constructor(private http: HttpClient) { }

    public availableCourses(query: string = null): Observable<ICourse[]> {
        let params = new HttpParams();

        if (query) {
            params = params.set('query', query);
        }

        return this.http
            .get<ICourse[]>(
                `${environment.api}/courses/`,
                { params }
            );
    }
}
