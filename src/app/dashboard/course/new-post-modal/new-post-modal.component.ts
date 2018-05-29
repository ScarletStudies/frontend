import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { CategoryService, PostService } from '../../../services';
import { ICategory, IAppState, IPost, ICourse } from '../../../models';

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
        private router: Router) { }

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

        this.postService.addPost(post)
            .subscribe(
                post => {
                    this.activeModal.close();
                    this.router.navigate(['/dashboard', 'post', post.id]);
                }
            );
    }
}
