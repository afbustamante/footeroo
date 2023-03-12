import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(private oidcSecurityService: OidcSecurityService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Add authorisation header with JWT token if available
        const token = this.oidcSecurityService.getAccessToken();
        
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next.handle(req);
    }
}
