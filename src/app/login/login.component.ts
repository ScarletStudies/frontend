import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../models';

import * as LoginActions from '../actions/user.actions';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private store: Store<IAppState>) { }

    ngOnInit() {
    }

    public login(email: string, password: string): void {
        this.store.dispatch(new LoginActions.AttemptLoginAction({ email, password }));
    }
}
