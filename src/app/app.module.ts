import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';

import { SecurityModule } from './security/security.module';
import { PlayersModule } from './players/players.module';
import { MatchesModule } from './matches/matches.module';
import { CommonsModule } from './commons/commons.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SitesModule } from './sites/sites.module';
import { CarsModule } from './cars/cars.module';
import { AuthConfigModule } from './auth/auth-config.module';
import { AuthInterceptor } from 'angular-auth-oidc-client';

registerLocaleData(localeFr, 'fr-FR');
registerLocaleData(localeEs, 'es-ES');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonsModule,
    RouterModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    SecurityModule,
    PlayersModule,
    MatchesModule,
    SitesModule,
    CarsModule,
    AuthConfigModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
