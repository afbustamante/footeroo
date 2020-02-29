import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';
import { MainActionsComponent } from './commons/main-actions/main-actions.component';

import { SecurityModule } from './security/security.module';
import { PlayersModule } from './players/players.module';
import { MatchesModule } from './matches/matches.module';
import { CommonsModule } from './commons/commons.module';
import { HttpClientModule } from '@angular/common/http';
import { SignInGuard } from './security/sign-in.guard';
import { AuthenticationInterceptor } from './security/authentication-interceptor';

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
    SecurityModule,
    PlayersModule,
    MatchesModule
  ],
  providers: [
    SignInGuard,
    AuthenticationInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
