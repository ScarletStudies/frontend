import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ICourse, IPost } from '../../models';
import { PostService, IPostQueryParameters } from '../../services';

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

    public posts$: Observable<IPost[]> = null;

    private queryParams$: BehaviorSubject<IPostQueryParameters> = new BehaviorSubject<IPostQueryParameters>({});

    private subscriptions: Subscription[] = [];

    constructor(private postService: PostService) { }

    ngOnInit() {
        const sub = this.queryParams$
            .pipe(
                distinctUntilChanged(),
                debounceTime(250)
            )
            .subscribe(
                this.updatePosts.bind(this)
            );

        this.subscriptions.push(sub);
    }

    ngOnDestroy() {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }

    private updatePosts(queryParams?: IPostQueryParameters) {
        console.log('hello world');
        this.posts$ = this.postService.get(queryParams);
    }
}
