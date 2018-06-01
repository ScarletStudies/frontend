import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { IAppState, ICourse, IPost, IPostQueryParameters } from '../../models';
import { PostService } from '../../services';
import { IPostListItemOptions } from './post-list-item/post-list-item.component';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

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
    public set limit(limit: number) {
        this.queryParams$.next({
            ...this.queryParams$.value,
            limit
        });
    }

    @Input()
    public set sort(sort: 'time' | 'activity') {
        this.queryParams$.next({
            ...this.queryParams$.value,
            sort
        });
    }

    @Input()
    public set category(id: string) {
        this.queryParams$.next({
            ...this.queryParams$.value,
            categories: [{ id }].filter(c => !!c.id)
        });
    }

    @Input()
    public set query(query: string) {
        this.queryParams$.next({
            ...this.queryParams$.value,
            query
        });
    }

    @Input()
    public itemOptions: IPostListItemOptions = {};

    @Input()
    public showLoadMore = true;

    public posts: IPost[] = null;
    public queryParams$ = new BehaviorSubject<IPostQueryParameters>({});

    private subscriptions: Subscription[] = [];

    constructor(private postService: PostService) { }

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
                    posts => this.posts = posts
                ),
        );
    }

    ngOnDestroy() {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }

    public trackByFn(index: number, post: IPost): string {
        return post.id;
    }

    public loadMore(): void {
        const current = this.queryParams$.value;
        this.queryParams$.next({
            ...current,
            limit: current.limit * 2
        });
    }
}
