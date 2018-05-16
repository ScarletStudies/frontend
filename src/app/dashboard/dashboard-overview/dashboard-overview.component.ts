import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IAppState, ICourse } from '../../models';

@Component({
    selector: 'app-dashboard-overview',
    templateUrl: './dashboard-overview.component.html',
    styleUrls: ['./dashboard-overview.component.css']
})
export class DashboardOverviewComponent implements OnInit {

    public semesterCourses$: Observable<ICourse[]>;

    constructor(private store: Store<IAppState>) { }

    ngOnInit() {
        this.semesterCourses$ = this.store.pipe(select(state => state.schedule));
    }
}
