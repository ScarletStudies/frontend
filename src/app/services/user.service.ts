import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { ICourse } from '../models';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    public register(payload: { email: string, password: string }): Observable<void> {
        return this.http
            .post<void>(
                `${environment.api}/users/register`,
                payload
            );
    }
}
