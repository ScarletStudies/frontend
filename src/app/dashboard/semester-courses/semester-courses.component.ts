import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IAppState, ICourse } from '../../models';

import * as ScheduleActions from '../../actions/schedule.actions';

@Component({
    selector: 'app-semester-courses',
    templateUrl: './semester-courses.component.html',
    styleUrls: ['./semester-courses.component.css']
})
export class SemesterCoursesComponent implements OnInit {

    public semesterCourses$: Observable<ICourse[]> = null;

    constructor(private store: Store<IAppState>) { }

    ngOnInit() {
        this.store.dispatch(new ScheduleActions.GetCoursesAttemptAction());
        this.semesterCourses$ = this.store.pipe(select(state => state.schedule));
    }
}
