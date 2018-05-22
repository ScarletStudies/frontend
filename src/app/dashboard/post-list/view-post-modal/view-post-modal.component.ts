import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { IPost, IAppState } from '../../../models';
import { IPostListItemOptions } from '../post-list-item/post-list-item.component';
import { CommentPostAttemptAction, CheerPostAttemptAction } from '../../../actions/post.actions';

@Component({
    selector: 'app-view-post-modal',
    templateUrl: './view-post-modal.component.html',
    styleUrls: ['./view-post-modal.component.css']
})
export class ViewPostModalComponent implements OnInit, OnDestroy {

    @Input()
    public set postId(id: string) {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        this.subscription = this.store
            .pipe(
                select(state => state.posts.find(p => p.id === id))
            )
            .subscribe(
                post => this.post = post
            );
    }

    public post: IPost = null;
    public commentForm: FormGroup = null;
    public itemOptions: IPostListItemOptions = {
        action: 'cheer',
        hideBorderBottom: true,
        hideCourseName: false,
        showPostContent: true
    };
    public quillModules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'link', 'code-block']
        ]
    };

    private subscription: Subscription = null;

    constructor(public activeModal: NgbActiveModal,
        private fb: FormBuilder,
        private store: Store<IAppState>) { }

    ngOnInit() {
        this.commentForm = this.fb.group({
            content: ['', Validators.required]
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    public comment(): void {
        const data = { post: this.post, comment: this.commentForm.value };

        this.store.dispatch(new CommentPostAttemptAction(data));

        // TODO reset comment form after successful comment?
    }

    public cheer(): void {
        this.store.dispatch(new CheerPostAttemptAction(this.post));
    }
}
