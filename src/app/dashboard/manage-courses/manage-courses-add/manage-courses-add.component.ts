import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { CourseService } from '../../../services';

import {
    IAppState,
    ICourse
} from '../../../models';
import * as ScheduleActions from '../../../actions/schedule.actions';

@Component({
    selector: 'app-manage-courses-add',
    templateUrl: './manage-courses-add.component.html',
    styleUrls: ['./manage-courses-add.component.css']
})
export class ManageCoursesAddComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];

    public availableCourses$: Observable<ICourse[]> = null;

    public queryControl = new FormControl();

    constructor(private courseService: CourseService,
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
    }

    ngOnDestroy() {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }

    private updateSearch(query: string = null): void {
        this.availableCourses$ = combineLatest(
            this.courseService.availableCourses(query),
            this.store.pipe(select(state => state.schedule))
        )
            .pipe(
                map(
                    ([available, schedule]) => {
                        return available.filter(
                            course => !schedule.find(
                                c => c.id === course.id
                            )
                        );
                    }
                )
            );
    }

    public addCourseToSchedule(course: ICourse): void {
        this.store.dispatch(new ScheduleActions.AddCourseAttemptAction(course.id));
    }
}
