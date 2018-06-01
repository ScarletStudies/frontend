import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { IPost, IAppState } from '../../models';
import { PostService, AlertService } from '../../services';
import { ErrorAction } from '../../actions/error.actions';

interface IAnchor {
    title: string;
    safeUrl: SafeUrl;
    url: string;
}

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

    public post: IPost = null;
    public postSafeHtml: SafeHtml = null;
    public safeLinks: IAnchor[] = null;
    public commentForm: FormGroup = null;
    public quillModules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'link', 'code-block']
        ]
    };

    private subscriptions: Subscription[] = [];

    constructor(private fb: FormBuilder,
        private postService: PostService,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer,
        private store: Store<IAppState>) { }

    ngOnInit() {
        this.commentForm = this.fb.group({
            content: ['', Validators.required]
        });

        this.subscriptions.push(
            this.route
                .params
                .pipe(
                    switchMap(
                        ({ id }) => this.postService.getOne(id)
                    )
                )
                .subscribe(
                    post => this.updatePost(post),
                    err => this.store.dispatch(new ErrorAction(err))
                )
        );
    }

    ngOnDestroy() {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }

    private updatePost(post: IPost): void {
        this.post = post;

        // get safe html content
        this.postSafeHtml = this.sanitizer.bypassSecurityTrustHtml(post.content);

        // get safe html links
        const parser = new DOMParser();
        const html = parser.parseFromString(post.content, 'text/html');

        const safeLinks: IAnchor[] = [];
        const nodeList = html.getElementsByTagName('a');

        for (let i = 0; i < nodeList.length; i++) {
            safeLinks.push(
                {
                    safeUrl: this.sanitizer.bypassSecurityTrustUrl(nodeList[i].href),
                    url: nodeList[i].href,
                    title: nodeList[i].innerText,
                }
            );
        }

        this.safeLinks = safeLinks;
    }

    public comment(): void {
        this.subscriptions.push(
            this.postService
                .addComment(this.post, this.commentForm.value)
                .subscribe(
                    post => {
                        this.updatePost(post);
                        this.commentForm.reset();
                    }
                )
        );
    }

    public cheer(): void {
        this.subscriptions.push(
            this.postService
                .addCheer(this.post)
                .subscribe(
                    post => this.updatePost(post)
                )
        );
    }
}
