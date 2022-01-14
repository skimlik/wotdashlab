import { BrowserModule, Title } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { CoreModule } from './core/core.module';
import { ApplicationSettingsLoaderService } from './core/infrastructure/application-settings.loader.service';
import { AppCommonModule } from './common/app-common.module';
import { LocalStorageService } from './core/infrastructure/local-storage.service';
import { HeadersInterceptor } from './core/infrastructure/http';
import { HomePageComponent } from './home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({
      router: routerReducer,
    }, {
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true,
      }
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'WotDashLab',
      maxAge: 25,
      logOnly: environment.production,
    }),
    AppCommonModule,
    CoreModule.forRoot(),
    AppRoutingModule,
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    Title,
    {
      provide: APP_INITIALIZER,
      useFactory: (resolver: ApplicationSettingsLoaderService) => () => resolver.load(),
      deps: [ApplicationSettingsLoaderService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      deps: [LocalStorageService],
      useClass: HeadersInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
