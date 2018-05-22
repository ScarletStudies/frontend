import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAppState, ICourse, ICategory } from '../../models';
import { NewPostModalComponent } from './new-post-modal/new-post-modal.component';

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnDestroy {

    public course: ICourse = null;

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
    }
}
