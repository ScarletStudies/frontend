import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';

import { take } from 'rxjs/operators';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';

import { StoreModule, Store, select, MetaReducer, ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { reducers } from './reducers';
import { IAppState } from './models';

import { EffectsModule } from '@ngrx/effects';
import { APP_EFFECTS } from './effects';

import { JwtModule, JWT_OPTIONS, JwtModuleOptions } from '@auth0/angular-jwt';

import { APP_SERVICES } from './services';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

export function jwtOptionsFactory(store: Store<IAppState>) {
    return {
        tokenGetter: () => {
            return new Promise(
                (resolve, reject) => {
                    const sub = store
                        .pipe(
                            select(state => state.user.jwt),
                            take(1)
                        )
                        .subscribe(resolve);
                }
            );
        },
        whitelistedDomains: environment.whitelistedDomains,
        blacklistedRoutes: environment.blacklistedRoutes
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
        LoginComponent,
        RegisterComponent,
        HeaderComponent,
        FooterComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        JwtModule.forRoot({
            jwtOptionsProvider: {
                provide: JWT_OPTIONS,
                useFactory: jwtOptionsFactory,
                deps: [Store]
            }
        }),
        StoreModule.forRoot({
            router: routerReducer,
            ...reducers
        },
            { metaReducers }),
        EffectsModule.forRoot(APP_EFFECTS),
        StoreRouterConnectingModule.forRoot({
            stateKey: 'router' // name of reducer key
        }),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // retains last 25 states
            logOnly: environment.production
        })
    ],
    providers: [
        ...APP_SERVICES
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
