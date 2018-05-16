import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { IAppState, ICourse } from '../../models';

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

    public courses$: Observable<ICourse[]>;

    constructor(private store: Store<IAppState>,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.courses$ = this.route
            .params
            .pipe(
                switchMap(
                    ({ id }) => {
                        return this.store
                            .pipe(
                                select(state => state.schedule.filter(c => c.id === id))
                            );
                    }
                )
            );
    }
}
