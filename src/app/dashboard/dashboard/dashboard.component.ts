import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../../models';
import * as ScheduleActions from '../../actions/schedule.actions';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    constructor(private store: Store<IAppState>) { }

    ngOnInit() {
        this.store.dispatch(new ScheduleActions.GetCoursesAttemptAction());
    }
}
