import { Component, OnInit, Input, OnDestroy, EventEmitter } from '@angular/core';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ICourse, IPost } from '../../models';
import { PostService, IPostQueryParameters } from '../../services';

export interface IRefreshEvent {
    type: 'refresh';
}

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

    @Input()
    public set courses(courses: ICourse[]) {
        this.queryParams$.next({
            ...this.queryParams$.value,
            courses
        });
    }

    @Input()
    public set limit(limit: number) {
        this.queryParams$.next({
            ...this.queryParams$.value,
            limit
        });
    }

    @Input()
    public set refreshEvents(events: EventEmitter<IRefreshEvent>) {
        this.subscriptions.push(
            events.subscribe(
                () => this.updatePosts(this.queryParams$.value)
            )
        );
    }

    public posts$: Observable<IPost[]> = null;

    private queryParams$ = new BehaviorSubject<IPostQueryParameters>({});

    private subscriptions: Subscription[] = [];

    constructor(private postService: PostService) { }

    ngOnInit() {
        this.subscriptions.push(
            this.queryParams$
                .pipe(
                    distinctUntilChanged(),
                    debounceTime(250)
                )
                .subscribe(
                    this.updatePosts.bind(this)
                )
        );
    }

    ngOnDestroy() {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }

    private updatePosts(queryParams?: IPostQueryParameters) {
        this.posts$ = this.postService.get(queryParams);
    }
}
