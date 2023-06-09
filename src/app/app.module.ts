import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { LoginPageModule } from './login-page/login-page.module';
import { httpInterceptorProviders } from './core/interceptors';
import { AuthEffects } from './state/auth/auth.effects';
import { rootReducer } from './state';
import { CoursesEffects } from './state/courses/courses.effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        LayoutModule,
        LoginPageModule,
        HttpClientModule,
        AngularSvgIconModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
            defaultLanguage: 'en',
        }),
        StoreModule.forRoot(rootReducer),
        EffectsModule.forRoot([AuthEffects, CoursesEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: !isDevMode(),
            trace: true,
        }),
        EffectsModule.forFeature([CoursesEffects]),
    ],
    providers: [httpInterceptorProviders, CookieService],
    bootstrap: [AppComponent],
})
export class AppModule {}
