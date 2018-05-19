import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { IPost } from '../../../models';

export interface IPostListItemOptions {
    hideBorderBottom?: boolean;
    hideCourseName?: boolean;
    showPostContent?: boolean;
    action?: 'view' | 'cheer';
}

@Component({
    selector: 'app-post-list-item',
    templateUrl: './post-list-item.component.html',
    styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent implements OnInit {

    @Input()
    public post: IPost = null;

    @Input()
    public options: IPostListItemOptions = {};

    @Output()
    public cheer = new EventEmitter<void>();

    @Output()
    public view = new EventEmitter<void>();

    public safePostContent: SafeHtml = null;

    constructor(private sanitizer: DomSanitizer) { }

    ngOnInit() {
        this.safePostContent = this.sanitizer.bypassSecurityTrustHtml(this.post.content);
    }
}
