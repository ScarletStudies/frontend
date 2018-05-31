import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { IAuthUser, IAppState } from '../../models';
import { UserService } from '../../services';

import { ErrorAction } from '../../actions/error.actions';
import * as UserActions from '../../actions/user.actions';
import * as RouterActions from '../../actions/router.actions';


@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.component.html',
    styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];

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
                            return this.userService.bypass(code);
                        }
                    )
                )
                .subscribe(
                    authUser => {
                        this.store.dispatch(new UserActions.LoginSuccessAction(authUser));
                        this.store.dispatch(new RouterActions.Go({ path: ['/dashboard/user-settings'] }));
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
