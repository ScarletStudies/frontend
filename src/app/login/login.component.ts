import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IAppState } from '../models';

import * as LoginActions from '../actions/user.actions';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public form: FormGroup = null;

    constructor(private store: Store<IAppState>,
        private fb: FormBuilder) { }

    ngOnInit() {
        this.form = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    public login(): void {
        this.store.dispatch(new LoginActions.AttemptLoginAction(this.form.value));
    }
}
