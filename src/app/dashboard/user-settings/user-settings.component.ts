import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import { UserService, AlertService } from '../../services';
import { IAppState } from '../../models';
import { ErrorAction } from '../../actions/error.actions';
import { LogoutAction } from '../../actions/user.actions';
import * as RouterActions from '../../actions/router.actions';

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
        private alertService: AlertService,
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
            password: ['', Validators.required],
            remove_content: false
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

    deleteAccount() {
        const { password, remove_content } = this.deleteAccountForm.value;

        this.userService
            .deleteAccount({ password, remove_content })
            .subscribe(
                () => {
                    this.store.dispatch(new RouterActions.Go({ path: ['/'] }));
                    this.store.dispatch(new LogoutAction());
                    this.alertService.success('Account deleted');
                },
                err => this.store.dispatch(new ErrorAction(err))
            );
    }
}
