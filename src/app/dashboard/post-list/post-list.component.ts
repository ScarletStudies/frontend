import { Component, OnInit, Input, OnDestroy, EventEmitter } from '@angular/core';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';

import { IAppState, ICourse, IPost, IPostQueryParameters } from '../../models';
import { IPostListItemOptions } from './post-list-item/post-list-item.component';
import { ViewPostModalComponent } from './view-post-modal/view-post-modal.component';
import { GetPostsAttemptAction } from '../../actions/post.actions';

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
    public itemOptions: IPostListItemOptions = {};

    public posts: IPost[] = [];

    private queryParams$ = new BehaviorSubject<IPostQueryParameters>({});
    private subscriptions: Subscription[] = [];

    constructor(private store: Store<IAppState>,
        private modalService: NgbModal) { }

    ngOnInit() {
        this.subscriptions.push(
            this.queryParams$
                .pipe(
                    distinctUntilChanged(),
                    debounceTime(250)
                )
                .subscribe(
                    queryParams => this.store.dispatch(new GetPostsAttemptAction(queryParams))
                ),
            this.store
                .pipe(
                    select(state => state.posts)
                )
                .subscribe(
                    posts => this.posts = posts
                )
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

    public viewPost(id: string): void {
        const modalRef = this.modalService.open(
            ViewPostModalComponent,
            { size: 'lg', backdropClass: 'backdrop' }
        );

        modalRef.componentInstance.postId = id;
    }
}
