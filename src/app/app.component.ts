import { Component, OnInit } from '@angular/core';
import { User } from './security/user';
import { AuthenticationService } from './security/authentication.service';
import { Router } from '@angular/router';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  currentUser: User;
  version: string;

  constructor(
    private authenticationService: AuthenticationService,
    private oidcSecurityService: OidcSecurityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.currentUser == null) {
      this.currentUser = this.authenticationService.currentUser;
    }

    this.oidcSecurityService.checkAuth().subscribe(
      (loginResponse: LoginResponse) => {
        const { isAuthenticated, userData, accessToken, idToken, configId } = loginResponse;

        if (isAuthenticated) {
          this.currentUser = this.authenticationService.currentUser;
        }
      }
    );
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  signin() {
    this.oidcSecurityService.authorize();
  }

  signout() {
    this.oidcSecurityService.logoff().subscribe((result) => console.log(result));
    this.router.navigate(['/']);
  }
}
