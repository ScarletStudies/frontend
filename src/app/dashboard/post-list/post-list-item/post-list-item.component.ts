import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ViewPostModalComponent } from '../view-post-modal/view-post-modal.component';

import { IPost } from '../../../models';

@Component({
    selector: 'app-post-list-item',
    templateUrl: './post-list-item.component.html',
    styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent implements OnInit {

    @Input()
    public post: IPost = null;

    constructor(private modalService: NgbModal) { }

    ngOnInit() {
    }

    public open(): void {
        const modalRef = this.modalService.open(
            ViewPostModalComponent,
            { size: 'lg', backdropClass: 'backdrop' }
        );

        modalRef.componentInstance.post = this.post;
    }
}
