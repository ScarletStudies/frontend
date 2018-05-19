import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { PostService, CategoryService } from '../../../services';
import { ICategory } from '../../../models';

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
        private postService: PostService,
        private fb: FormBuilder) { }

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

        this.postService.add(title, content, this.courseId, category)
            .subscribe(
                () => {
                    this.activeModal.close();
                }
            );
    }
}
