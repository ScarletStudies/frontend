import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { PostService, CategoryService } from '../../services';

import { IAppState, ICourse, ICategory } from '../../models';
import { IRefreshEvent } from '../post-list/post-list.component';

@Component({
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
    public form: FormGroup = null;
    public quillModules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'link', 'code-block']
        ]
    };

    constructor(private store: Store<IAppState>,
        private route: ActivatedRoute,
        private modalService: NgbModal,
        private postService: PostService,
        private categoryService: CategoryService,
        private fb: FormBuilder) { }

    ngOnInit() {
        this.categories$ = this.categoryService.get();

        this.form = this.fb.group({
            title: ['', Validators.required],
            content: ['', Validators.required],
            category: ['', Validators.required]
        });

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
        this.modalRef = this.modalService.open(content, { backdropClass: 'backdrop', size: 'lg' });
    }

    submit(): void {
        const { title, content, category } = this.form.value;

        this.postService.add(title, content, this.course.id, category)
            .subscribe(
                () => {
                    this.modalRef.close();
                    this.refreshEvents.emit({ type: 'refresh' });
                }
            );
    }
}
