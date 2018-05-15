import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { environment } from '../../../environments/environment';

import {
    IAppState,
    ICourse
} from '../../models';
import * as ScheduleActions from '../../actions/schedule.actions';

@Component({
    selector: 'app-manage-courses',
    templateUrl: './manage-courses.component.html',
    styleUrls: ['./manage-courses.component.css']
})
export class ManageCoursesComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription[] = [];

    public availableCourses$: Observable<ICourse[]> = null;
    public scheduleCourses$: Observable<ICourse[]> = null;

    public queryControl = new FormControl();

    constructor(private http: HttpClient,
        private store: Store<IAppState>) { }

    ngOnInit() {
        // setup course listings and search
        this.updateSearch();

        this.subscriptions.push(
            this.queryControl
                .valueChanges
                .pipe(
                    debounceTime(250)
                )
                .subscribe(this.updateSearch.bind(this))
        );

        // setup and update course schedule
        this.store.dispatch(new ScheduleActions.GetCoursesAttemptAction());
        this.scheduleCourses$ = this.store
            .pipe(
                select(state => state.schedule)
            );
    }

    ngOnDestroy() {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }

    private updateSearch(query: string = null): void {
        let params = new HttpParams();

        if (query) {
            params = params.set('query', query);
        }

        this.availableCourses$ = this.http
            .get<ICourse[]>(
                `${environment.api}/courses/`,
                { params }
            );
    }

    public addCourseToSchedule(course: ICourse): void {
        this.store.dispatch(new ScheduleActions.AddCourseAttemptAction(course.id));
    }

    public removeCourseFromSchedule(course: ICourse): void {
        this.store.dispatch(new ScheduleActions.RemoveCourseAttemptAction(course.id));
    }
}
