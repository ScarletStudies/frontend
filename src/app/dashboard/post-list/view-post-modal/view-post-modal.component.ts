import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';

import { PostService } from '../../../services';
import { IPost, IPostWithComments } from '../../../models';
import { IPostListItemOptions } from '../post-list-item/post-list-item.component';

@Component({
    selector: 'app-view-post-modal',
    templateUrl: './view-post-modal.component.html',
    styleUrls: ['./view-post-modal.component.css']
})
export class ViewPostModalComponent implements OnInit, OnDestroy {

    @Input()
    public set postId(postId: string) {
        this._postId = postId;

        this.refresh();
    }

    public post$: Observable<IPostWithComments> = null;

    public itemOptions: IPostListItemOptions = {
        action: 'cheer',
        hideBorderBottom: true,
        hideCourseName: false,
        showPostContent: true
    };

    public commentForm: FormGroup = null;

    private _postId: string;
    private subscriptions: Subscription[] = [];

    constructor(public activeModal: NgbActiveModal,
        private fb: FormBuilder,
        private postService: PostService) { }

    ngOnInit() {
        this.commentForm = this.fb.group({
            content: ['', Validators.required]
        });
    }

    ngOnDestroy() {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }

    private refresh(): void {
        this.post$ = this.postService.one(this._postId);
    }

    public comment(): void {
        const { content } = this.commentForm.value;

        this.subscriptions.push(
            this.postService
                .comment(this._postId, content)
                .subscribe(
                    () => {
                        this.commentForm.reset();

                        this.refresh();
                    }
                )
        );
    }

    public cheer(): void {
        this.subscriptions.push(
            this.postService
                .cheer(this._postId)
                .subscribe(
                    this.refresh.bind(this)
                )
        );
    }
}
