import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { IComment, IUser } from '../../../models';

@Component({
    selector: 'app-comment-list-item',
    templateUrl: './comment-list-item.component.html',
    styleUrls: ['./comment-list-item.component.css']
})
export class CommentListItemComponent implements OnInit {

    @Input()
    public comment: IComment = null;

    @Input()
    public op: IUser = null;

    @Input()
    public currentUser: IUser = null;

    @Output()
    public erase = new EventEmitter();

    public safeCommentContent: SafeHtml = null;

    constructor(private sanitizer: DomSanitizer) { }

    ngOnInit() {
        this.safeCommentContent = this.sanitizer.bypassSecurityTrustHtml(this.comment.content);
    }
}
