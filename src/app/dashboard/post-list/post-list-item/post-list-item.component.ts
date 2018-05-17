import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ViewPostModalComponent } from '../view-post-modal/view-post-modal.component';

import { IPost } from '../../../models';

export interface IPostListItemOptions {
    hideBorderBottom?: boolean;
    hideCourseName?: boolean;
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

    constructor(private modalService: NgbModal) { }

    ngOnInit() {
    }

    public open(): void {
        const modalRef = this.modalService.open(
            ViewPostModalComponent,
            { size: 'lg', backdropClass: 'backdrop' }
        );

        modalRef.componentInstance.postId = this.post.id;
    }
}
