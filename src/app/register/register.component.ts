import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import { UserService } from '../services';
import { IAppState } from '../models';
import { ErrorAction } from '../actions/error.actions';

function passwordEquivalenceValidator(control: AbstractControl): { [key: string]: any } {
    const formVal = control.value;

    if (formVal.password && formVal.passwordConfirmation) {
        if (formVal.password !== formVal.passwordConfirmation) {
            return {
                passwordEquivalence: {
                    value: true
                }
            };
        }
    }

    return null;
}

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    public form: FormGroup = null;
    public registered = false;

    constructor(private fb: FormBuilder,
        private userService: UserService,
        private store: Store<IAppState>) { }

    ngOnInit() {
        this.form = this.fb.group(
            {
                email: ['', Validators.required],
                password: ['', Validators.required],
                passwordConfirmation: ['', Validators.required]
            },
            {
                validator: passwordEquivalenceValidator
            }
        );
    }

    public submit(): void {
        const { email, password } = this.form.value;
        this.userService
            .register({ email, password })
            .subscribe(
                () => {
                    this.registered = true;
                },
                err => {
                    this.store.dispatch(new ErrorAction(err));
                }
            );
    }
}
