import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';

import { take } from 'rxjs/operators';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule, Store, select } from '@ngrx/store';
import { reducers, IAppState } from './app.actions';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects, ScheduleEffects } from './app.effects';
import { RouterEffects } from './router.effects';

import { JwtModule, JWT_OPTIONS, JwtModuleOptions } from '@auth0/angular-jwt';

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
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/users/login', 'localhost:5000/users/refresh']
    };
}

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        HeaderComponent,
        FooterComponent
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
        }),
        EffectsModule.forRoot([AuthEffects, RouterEffects, ScheduleEffects]),
        StoreRouterConnectingModule.forRoot({
            stateKey: 'router' // name of reducer key
        }),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // retains last 25 states
            logOnly: environment.production
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
