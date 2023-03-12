import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignInGuard implements CanActivate {

  constructor(
    private router: Router,
    private oidcSecurityService: OidcSecurityService
  ) {}

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.oidcSecurityService.isAuthenticated$.pipe(
      take(1),
      map(({ isAuthenticated }) => {
        // allow navigation if authenticated
        if (isAuthenticated) {
          return true;
        }

        // redirect if not authenticated
        this.router.navigate(['/sign-in'], { queryParams: { dest: state.url} });
        return false;
      })
    );
  }
}
