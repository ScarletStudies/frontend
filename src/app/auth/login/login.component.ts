import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IAppState } from '../../models';
import { UserService } from '../../services';

import * as LoginActions from '../../actions/user.actions';
import { ErrorAction } from '../../actions/error.actions';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public form: FormGroup = null;
    public forgotPasswordForm: FormGroup = null;
    public isCollapsed = true;
    public forgotPasswordDone = false;

    constructor(private store: Store<IAppState>,
        private fb: FormBuilder,
        private userService: UserService) { }

    ngOnInit() {
        this.form = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.forgotPasswordForm = this.fb.group({
            email: ['', Validators.required]
        });
    }

    public login(): void {
        this.store.dispatch(new LoginActions.AttemptLoginAction(this.form.value));
    }

    public forgotPassword(): void {
        this.userService
            .forgotPassword(this.forgotPasswordForm.value)
            .subscribe(
                () => this.forgotPasswordDone = true,
                err => this.store.dispatch(new ErrorAction(err))
            );
    }
}
