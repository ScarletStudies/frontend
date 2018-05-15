import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import {
    IAppState,
    ICourse,
    ScheduleAddCourseAttemptAction,
    ScheduleRemoveCourseAttemptAction
} from '../../app.actions';

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

        // setup course schedule
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
                'http://localhost:5000/courses/',
                { params }
            );
    }

    public addCourseToSchedule(course: ICourse): void {
        this.store.dispatch(new ScheduleAddCourseAttemptAction(course.id));
    }

    public removeCourseFromSchedule(course: ICourse): void {
        this.store.dispatch(new ScheduleRemoveCourseAttemptAction(course.id));
    }
}
