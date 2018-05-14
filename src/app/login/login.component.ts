import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState, AttemptLoginAction } from '../app.actions';

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
        this.store.dispatch(new AttemptLoginAction({ email, password }));
    }
}
