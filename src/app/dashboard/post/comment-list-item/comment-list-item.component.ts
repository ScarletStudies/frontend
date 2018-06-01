import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { IComment } from '../../../models';

@Component({
    selector: 'app-comment-list-item',
    templateUrl: './comment-list-item.component.html',
    styleUrls: ['./comment-list-item.component.css']
})
export class CommentListItemComponent implements OnInit {

    @Input()
    public comment: IComment = null;

    public safeCommentContent: SafeHtml = null;

    constructor(private sanitizer: DomSanitizer) { }

    ngOnInit() {
        this.safeCommentContent = this.sanitizer.bypassSecurityTrustHtml(this.comment.content);
    }
}
