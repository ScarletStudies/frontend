import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { CategoryService, PostService } from '../../../services';
import { ICategory, IAppState, IPost, ICourse } from '../../../models';
import { ErrorAction } from '../../../actions/error.actions';

import * as moment from 'moment';

@Component({
    selector: 'app-new-post-modal',
    templateUrl: './new-post-modal.component.html',
    styleUrls: ['./new-post-modal.component.css']
})
export class NewPostModalComponent implements OnInit {

    public courseId: string = null;
    public categories$: Observable<ICategory[]> = null;
    public form: FormGroup = null;
    public quillModules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'link', 'code-block']
        ]
    };

    constructor(public activeModal: NgbActiveModal,
        private categoryService: CategoryService,
        private fb: FormBuilder,
        private postService: PostService,
        private router: Router,
        private store: Store<IAppState>) { }

    ngOnInit() {
        this.categories$ = this.categoryService.get();

        this.form = this.fb.group({
            title: ['', Validators.required],
            content: ['', Validators.required],
            category: ['', Validators.required],
            due_date: null
        });
    }

    submit(): void {
        const { title, content, category } = this.form.value;

        let post: Partial<IPost> = {
            content,
            title,
            category: {
                id: category
            } as ICategory,
            course: {
                id: this.courseId
            } as ICourse
        };

        const due_date_control = this.form.get('due_date');

        if (due_date_control.valid && due_date_control.value) {
            const { year, month, day } = due_date_control.value as { year: number, month: number, day: number };

            post = {
                ...post,
                due_date: moment({ year, month: month - 1, day }).format('YYYY-MM-DD'),
            };
        }

        this.postService.addPost(post)
            .subscribe(
                p => {
                    this.activeModal.close();
                    this.router.navigate(['/dashboard', 'post', p.id]);
                },
                err => this.store.dispatch(new ErrorAction(err))
            );
    }
}
