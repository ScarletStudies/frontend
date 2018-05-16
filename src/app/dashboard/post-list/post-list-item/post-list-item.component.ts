import { Component, OnInit, Input } from '@angular/core';

import { IPost } from '../../../models';

@Component({
    selector: 'app-post-list-item',
    templateUrl: './post-list-item.component.html',
    styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent implements OnInit {

    @Input()
    public post: IPost = null;

    constructor() { }

    ngOnInit() {
    }
}
