import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { IAuthUser } from '../models';

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

    public verify(jwt: string): Observable<IAuthUser> {
        return this.http
            .post<IAuthUser>(
                `${environment.api}/users/register/verify`,
                { jwt }
            );
    }

    public bypass(jwt: string): Observable<IAuthUser> {
        return this.http
            .post<IAuthUser>(
                `${environment.api}/users/login/magic`,
                { jwt }
            );
    }

    public refresh(jwt: string): Observable<IAuthUser> {
        console.log('refresh called');
        return this.http
            .get<IAuthUser>(
                `${environment.api}/users/refresh`,
                { headers: { 'Authorization': `Bearer ${jwt}` } }
            );
    }

    public resend(payload: { email: string }): Observable<void> {
        return this.http
            .post<void>(
                `${environment.api}/users/register/resend`,
                payload
            );
    }

    public changePassword(payload: { old: string, new: string }): Observable<void> {
        return this.http
            .post<void>(
                `${environment.api}/users/password/change`,
                payload
            );
    }

    public forgotPassword(payload: { email: string }): Observable<void> {
        return this.http
            .post<void>(
                `${environment.api}/users/password/forgot`,
                payload
            );
    }

    public deleteAccount(payload: { password: string, remove_content: boolean }): Observable<void> {
        return this.http
            .post<void>(
                `${environment.api}/users/remove`,
                payload
            );
    }
}
