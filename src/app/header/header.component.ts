import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { IAppState, IUser } from '../models';
import * as UserActions from '../actions/user.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    public user$: Observable<IUser> = null;
    constructor(private store: Store<IAppState>) { }

    ngOnInit() {
        this.user$ = this.store.pipe(select(state => state.user));
    }

    public logout(): void {
        this.store.dispatch(new UserActions.LogoutAction());
    }
}
