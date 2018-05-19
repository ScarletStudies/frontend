import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAppState, ICourse, ICategory } from '../../models';
import { IRefreshEvent } from '../post-list/post-list.component';
import { NewPostModalComponent } from './new-post-modal/new-post-modal.component';

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnDestroy {

    public course: ICourse = null;
    public refreshEvents = new EventEmitter<IRefreshEvent>();

    private subscriptions: Subscription[] = [];

    constructor(private store: Store<IAppState>,
        private route: ActivatedRoute,
        private modalService: NgbModal) { }

    ngOnInit() {
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

    open(): void {
        const modalRef = this.modalService
            .open(NewPostModalComponent, { backdropClass: 'backdrop', size: 'lg' });

        modalRef.componentInstance.courseId = this.course.id;

        modalRef
            .result
            .then(
                () => this.refreshEvents.emit({ type: 'refresh' })
            );
    }
}
