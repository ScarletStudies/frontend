import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import { ToastrModule } from 'ngx-toastr';

import { of } from 'rxjs';
import { take, mergeMap, tap, catchError } from 'rxjs/operators';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';

import { StoreModule, Store, select, MetaReducer, ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { reducers } from './reducers';
import { IAppState } from './models';
import { LoginSuccessAction, RefreshJwtAction } from './actions/user.actions';

import { EffectsModule } from '@ngrx/effects';
import { APP_EFFECTS } from './effects';

import { JwtModule, JWT_OPTIONS, JwtModuleOptions, JwtHelperService } from '@auth0/angular-jwt';

import { APP_SERVICES, UserService } from './services';

import { AuthGuard } from './auth-guard.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';

export function jwtOptionsFactory(store: Store<IAppState>, userService: UserService) {
    return {
        tokenGetter: () => {
            return new Promise<string>(
                (resolve, reject) => {
                    const sub = store
                        .pipe(
                            select(
                                state => {
                                    if (state && state.user && state.user.jwt) {
                                        return state.user.jwt;
                                    }

                                    return null;
                                }
                            ),
                            take(1),
                            mergeMap(
                                token => {
                                    const helper = new JwtHelperService();

                                    if (!token) {
                                        return of({ jwt: null });
                                    } else if (helper.isTokenExpired(token)) {
                                        return userService
                                            .refresh(token)
                                            .pipe(
                                                tap(
                                                    ({ jwt }) => store.dispatch(new RefreshJwtAction(jwt))
                                                )
                                            );
                                    }

                                    return of({ jwt: token });
                                }
                            ),
                            catchError(
                                err => {
                                    return of({ jwt: null });
                                }
                            )
                        )
                        .subscribe(
                            ({ jwt }) => resolve(jwt)
                        );
                }
            );
        },
        whitelistedDomains: environment.whitelistedDomains,
        blacklistedRoutes: environment.blacklistedRoutes,
        skipWhenExpired: true
    };
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({ keys: ['user'], rehydrate: true })(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        NotFoundComponent,
        AboutComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        StoreModule.forRoot(
            reducers,
            { metaReducers }
        ),
        EffectsModule.forRoot(APP_EFFECTS),
        StoreRouterConnectingModule.forRoot({
            stateKey: 'router' // name of reducer key
        }),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // retains last 25 states
            //            logOnly: environment.production
        }),
        NgbModule.forRoot(),
        LoadingBarHttpClientModule,
        LoadingBarRouterModule,
        JwtModule.forRoot({
            jwtOptionsProvider: {
                provide: JWT_OPTIONS,
                useFactory: jwtOptionsFactory,
                deps: [Store, UserService]
            }
        }),
        BrowserAnimationsModule,
        ToastrModule.forRoot()
    ],
    providers: [
        ...APP_SERVICES,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
