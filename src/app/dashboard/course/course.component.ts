import { Component, OnInit, OnDestroy, ViewEncapsulation, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { PostService, CategoryService } from '../../services';

import { IAppState, ICourse, ICategory } from '../../models';
import { IRefreshEvent } from '../post-list/post-list.component';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnDestroy {

    private modalRef: NgbModalRef = null;
    private subscriptions: Subscription[] = [];

    public categories$: Observable<ICategory[]> = null;
    public course: ICourse = null;
    public refreshEvents = new EventEmitter<IRefreshEvent>();

    constructor(private store: Store<IAppState>,
        private route: ActivatedRoute,
        private modalService: NgbModal,
        private postService: PostService,
        private categoryService: CategoryService) { }

    ngOnInit() {
        this.categories$ = this.categoryService.get();

        this.subscriptions.push(
            this.route
                .params
                .pipe(
                    switchMap(
                        ({ id }) => {
                            return this.store
                                .pipe(
                                    select(state => state.schedule.find(c => c.id === id))
                                );
                        }
                    )
                )
                .subscribe(
                    course => {
                        this.course = course;
                    }
                )
        );
    }

    ngOnDestroy() {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }

    open(content): void {
        this.modalRef = this.modalService.open(content, { backdropClass: 'backdrop' });
    }

    submit(title: string, category_id: string, content: string): void {
        this.postService.add(title, content, this.course.id, category_id, )
            .subscribe(
                () => {
                    this.modalRef.close();
                    this.refreshEvents.emit({ type: 'refresh' });
                }
            );
    }
}
