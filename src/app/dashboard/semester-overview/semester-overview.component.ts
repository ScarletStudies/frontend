import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IAppState, ICourse } from '../../models';

@Component({
    selector: 'app-semester-overview',
    templateUrl: './semester-overview.component.html',
    styleUrls: ['./semester-overview.component.css']
})
export class SemesterOverviewComponent implements OnInit {

    public semesterCourses$: Observable<ICourse[]> = null;
    public postsView: 'list' | 'calendar' = 'list';

    constructor(private store: Store<IAppState>) { }

    ngOnInit() {
        this.semesterCourses$ = this.store.pipe(select(state => state.schedule));
    }
}
