import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IAppState, ICourse } from '../../models';
import * as ScheduleActions from '../../actions/schedule.actions';

@Component({
    selector: 'app-dashboard-home',
    templateUrl: './dashboard-home.component.html',
    styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {

    public semesterCourses$: Observable<ICourse[]>;

    constructor(private store: Store<IAppState>) { }

    ngOnInit() {
        this.semesterCourses$ = this.store.pipe(select(state => state.schedule));

        this.store.dispatch(new ScheduleActions.GetCoursesAttemptAction());
    }
}
