import { NgModule } from '@angular/core';
import { AuthModule, } from 'angular-auth-oidc-client';
import { environment } from 'src/environments/environment';


@NgModule({
  imports: [AuthModule.forRoot({
    config: {
      authority: `${environment.usersApiUrl}`,
      redirectUrl: window.location.origin,
      postLogoutRedirectUri: window.location.origin,
      clientId: `${environment.usersApiClientId}`,
      scope: 'openid profile email offline_access',
      responseType: 'code',
      silentRenew: true,
      useRefreshToken: true,
      renewTimeBeforeTokenExpiresInSeconds: 30,
      secureRoutes: [`${environment.coreApiUrl}`]
    }
  })],
  exports: [AuthModule],
})
export class AuthConfigModule { }
