import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CategoryService } from '../../../services';
import { ICategory, IAppState, IPost, ICourse } from '../../../models';
import { CreatePostAttemptAction } from '../../../actions/post.actions';

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
        private store: Store<IAppState>) { }

    ngOnInit() {
        this.categories$ = this.categoryService.get();

        this.form = this.fb.group({
            title: ['', Validators.required],
            content: ['', Validators.required],
            category: ['', Validators.required]
        });

    }

    submit(): void {
        const { title, content, category } = this.form.value;
        const post: Partial<IPost> = {
            content,
            title,
            category: {
                id: category
            } as ICategory,
            course: {
                id: this.courseId
            } as ICourse
        };

        this.store.dispatch(new CreatePostAttemptAction({ post, modal: this.activeModal }));
    }
}
