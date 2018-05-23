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

    public error(message, title = null) {
        return this.toastr.error(message, title, TOASTR_CONFIG);
    }
}
