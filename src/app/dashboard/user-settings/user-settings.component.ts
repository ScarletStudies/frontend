import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import { UserService } from '../../services';
import { IAppState } from '../../models';
import { ErrorAction } from '../../actions/error.actions';

function passwordEquivalenceValidator(control: AbstractControl): { [key: string]: any } {
    const formVal = control.value;

    if (formVal.newPassword && formVal.newPasswordConfirmation) {
        if (formVal.newPassword !== formVal.newPasswordConfirmation) {
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
    selector: 'app-user-settings',
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

    public changePasswordForm: FormGroup = null;
    public deleteAccountForm: FormGroup = null;
    public hasChangedPassword = false;

    constructor(private fb: FormBuilder,
        private userService: UserService,
        private store: Store<IAppState>) { }

    ngOnInit() {
        this.changePasswordForm = this.fb.group(
            {
                currentPassword: ['', Validators.required],
                newPassword: ['', Validators.required],
                newPasswordConfirmation: ['', Validators.required]
            },
            {
                validator: passwordEquivalenceValidator
            }
        );

        this.deleteAccountForm = this.fb.group({
            passwordCheck: ''
        });
    }

    changePassword() {
        const { currentPassword, newPassword } = this.changePasswordForm.value;

        this.userService
            .changePassword({ old: currentPassword, new: newPassword })
            .subscribe(
                () => this.hasChangedPassword = true,
                err => this.store.dispatch(new ErrorAction(err))
            );
    }

    deleteAccount() { }
}
