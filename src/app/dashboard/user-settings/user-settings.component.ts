import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-user-settings',
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

    public changePasswordForm: FormGroup = null;
    public deleteAccountForm: FormGroup = null;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.changePasswordForm = this.fb.group({
            currentPassword: '',
            newPassword: '',
            newPasswordConfirmation: ''
        });

        this.deleteAccountForm = this.fb.group({
            passwordCheck: ''
        });
    }

    changePassword() { }

    deleteAccount() { }
}
