import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { IAuthUser, IAppState } from '../models';
import { UserService } from '../services';

import { ErrorAction } from '../actions/error.actions';
import * as UserActions from '../actions/user.actions';


@Component({
    selector: 'app-verify',
    templateUrl: './verify.component.html',
    styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription[] = [];

    public verified = false;

    constructor(private store: Store<IAppState>,
        private userService: UserService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.subscriptions.push(
            this.route
                .params
                .pipe(
                    switchMap(
                        ({ code }) => {
                            return this.userService.verify(code);
                        }
                    )
                )
                .subscribe(
                    authUser => {
                        this.store.dispatch(new UserActions.LoginSuccessAction(authUser));

                        this.verified = true;
                    },
                    err => {
                        this.store.dispatch(new ErrorAction(err));
                    }
                )
        );
    }

    ngOnDestroy() {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }
}
