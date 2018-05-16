import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

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

    public open(content): void {
        this.modalService.open(content, { size: 'lg', backdropClass: 'backdrop' });
    }
}
