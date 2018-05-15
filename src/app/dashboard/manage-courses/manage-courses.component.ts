import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ICourse } from '../../app.actions';

@Component({
    selector: 'app-manage-courses',
    templateUrl: './manage-courses.component.html',
    styleUrls: ['./manage-courses.component.css']
})
export class ManageCoursesComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription[] = [];

    public availableCourses$: Observable<ICourse[]> = null;

    public queryControl = new FormControl();

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.updateSearch();

        this.subscriptions.push(
            this.queryControl
                .valueChanges
                .pipe(
                    debounceTime(500)
                )
                .subscribe(this.updateSearch.bind(this))
        );
    }

    ngOnDestroy() {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }

    public updateSearch(query: string = null): void {
        let params = new HttpParams();

        if (query) {
            params = params.set('query', query);
        }

        this.availableCourses$ = this.http
            .get<ICourse[]>(
                'http://localhost:5000/courses/',
                { params }
            );
    }
}
