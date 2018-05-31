import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';

import { IAppState } from './models';
import { SetRedirectUrlAction } from './actions/user.actions';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private store: Store<IAppState>,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store
            .pipe(
                select(s => s.user),
                map(
                    user => !!user.jwt
                ),
                tap(
                    loggedIn => {
                        if (!loggedIn) {
                            this.store.dispatch(new SetRedirectUrlAction(state.url));
                            this.router.navigate(['/auth/login']);
                        }
                    }
                )
            );
    }
}
