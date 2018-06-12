import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAppState, ICourse, ICategory } from '../../models';
import { CategoryService, CourseService } from '../../services';
import { ErrorAction } from '../../actions/error.actions';

import { NewPostModalComponent } from './new-post-modal/new-post-modal.component';

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnDestroy {

    public course: ICourse = null;
    public sortForm: FormGroup = null;
    public categories$: Observable<ICategory[]> = null;
    public postsView: 'list' | 'calendar' = 'list';

    private subscriptions: Subscription[] = [];

    constructor(private store: Store<IAppState>,
        private route: ActivatedRoute,
        private modalService: NgbModal,
        private categoryService: CategoryService,
        private courseService: CourseService,
        private fb: FormBuilder) { }

    ngOnInit() {
        this.categories$ = this.categoryService.get();

        this.sortForm = this.fb.group({
            sort: 'time',
            category: null,
            query: ''
        });

        this.subscriptions.push(
            this.route
                .params
                .pipe(
                    switchMap(
                        ({ id }) => this.courseService.getOne(id)
                    ),
                    catchError(
                        (err: any): Observable<ICourse> => {
                            this.store.dispatch(new ErrorAction(err));
                            return of(null);
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
