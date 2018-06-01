import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import * as moment from 'moment';

import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent
} from 'angular-calendar';

import {
    isSameMonth,
    isSameDay,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    startOfDay,
    endOfDay,
    format
} from 'date-fns';

import { IAppState, ICourse, IPost, IPostQueryParameters } from '../../models';
import { PostService } from '../../services';
import * as RouterActions from '../../actions/router.actions';

@Component({
    selector: 'app-post-calendar',
    templateUrl: './post-calendar.component.html',
    styleUrls: ['./post-calendar.component.css']
})
export class PostCalendarComponent implements OnInit, OnDestroy {
    @Input()
    public set courses(courses: ICourse[]) {
        courses = courses.filter(course => !!course);

        if (courses.length === 0) {
            return;
        }

        this.queryParams$.next({
            ...this.queryParams$.value,
            courses
        });
    }

    @Input()
    public set category(id: string) {
        this.queryParams$.next({
            ...this.queryParams$.value,
            categories: [{ id }].filter(c => !!c.id)
        });
    }


    public viewDate: Date = new Date();
    public events: CalendarEvent<IPost>[] = [];
    public view: 'week' | 'month' = 'month';
    public activeDayIsOpen = false;
    public refresh = new Subject<any>();

    private queryParams$ = new BehaviorSubject<IPostQueryParameters>({});
    private subscriptions: Subscription[] = [];

    constructor(private postService: PostService,
        private store: Store<IAppState>) { }

    ngOnInit() {
        this.subscriptions.push(
            this.queryParams$
                .pipe(
                    distinctUntilChanged(),
                    debounceTime(250),
                    switchMap(
                        queryParams => this.postService.getAll(queryParams)
                    ),
            )
                .subscribe(
                    posts => {
                        this.events = posts.map(
                            post => ({
                                title: post.title,
                                start: moment(post.due_date, 'YYYY-MM-DD').toDate(),
                                meta: post
                            })
                        );
                    }
                ),
        );

        // initialize dates
        this.viewDateChange();
    }

    ngOnDestroy() {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }

    public viewDateChange(): void {
        const getStart: any = {
            month: startOfMonth,
            week: startOfWeek,
            day: startOfDay
        }[this.view];

        const getEnd: any = {
            month: endOfMonth,
            week: endOfWeek,
            day: endOfDay
        }[this.view];

        this.queryParams$.next({
            ...this.queryParams$.value,
            start_date: format(getStart(this.viewDate), 'YYYY-MM-DD'),
            end_date: format(getEnd(this.viewDate), 'YYYY-MM-DD')
        });

        this.activeDayIsOpen = false;
    }

    public dayClicked({ date, events }: { date: Date, events: Array<CalendarEvent<IPost>> }): void {
        if (isSameMonth(date, this.viewDate)) {
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
    }

    public handleEvent(action: string, event: CalendarEvent<IPost>): void {
        if (action === 'Clicked') {
            this.store.dispatch(new RouterActions.Go({ path: ['/dashboard', 'post', event.meta.id] }));
        }
    }
}
