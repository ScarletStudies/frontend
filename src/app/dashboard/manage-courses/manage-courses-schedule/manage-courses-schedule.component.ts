import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
    IAppState,
    ICourse
} from '../../../models';
import * as ScheduleActions from '../../../actions/schedule.actions';


@Component({
    selector: 'app-manage-courses-schedule',
    templateUrl: './manage-courses-schedule.component.html',
    styleUrls: ['./manage-courses-schedule.component.css']
})
export class ManageCoursesScheduleComponent implements OnInit {

    public scheduleCourses$: Observable<ICourse[]> = null;

    constructor(private store: Store<IAppState>) { }

    ngOnInit() {
        // setup and update course schedule
        this.store.dispatch(new ScheduleActions.GetCoursesAttemptAction());
        this.scheduleCourses$ = this.store
            .pipe(
                select(state => state.schedule)
            );
    }

    public removeCourseFromSchedule(course: ICourse): void {
        this.store.dispatch(new ScheduleActions.RemoveCourseAttemptAction(course.id));
    }
}
