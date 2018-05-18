import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

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

    constructor(private fb: FormBuilder) { }

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
}
