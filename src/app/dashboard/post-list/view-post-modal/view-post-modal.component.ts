import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';

import { PostService } from '../../../services';
import { IPost, IPostWithComments } from '../../../models';

@Component({
    selector: 'app-view-post-modal',
    templateUrl: './view-post-modal.component.html',
    styleUrls: ['./view-post-modal.component.css']
})
export class ViewPostModalComponent implements OnInit, OnDestroy {

    @Input()
    public set post(post: IPost) {
        this.postId = post.id;

        this.refresh();
    }

    public post$: Observable<IPostWithComments> = null;

    private postId: string;
    private subscriptions: Subscription[] = [];

    constructor(public activeModal: NgbActiveModal,
        private postService: PostService) { }

    ngOnInit() {
    }

    ngOnDestroy() {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }

    private refresh(): void {
        this.post$ = this.postService.one(this.postId);
    }

    public comment(content: string): void {
        this.subscriptions.push(
            this.postService
                .comment(this.postId, content)
                .subscribe(
                    this.refresh.bind(this)
                )
        );
    }

    public cheer(): void {
        this.subscriptions.push(
            this.postService
                .cheer(this.postId)
                .subscribe(
                    this.refresh.bind(this)
                )
        );
    }
}
