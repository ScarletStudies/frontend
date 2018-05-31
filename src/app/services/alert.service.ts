import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

const TOASTR_CONFIG: Partial<IndividualConfig> = {
    timeOut: 0
};

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor(private toastr: ToastrService) { }

    public success(message: string, title: string = null) {
        return this.toastr.success(message, title, TOASTR_CONFIG);
    }

    public error(message: string, title: string = null) {
        return this.toastr.error(message, title, TOASTR_CONFIG);
    }
}
