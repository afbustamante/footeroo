import { Component, OnInit } from '@angular/core';
import { User } from './security/user';
import { AuthenticationService } from './security/authentication.service';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  currentUser: User;

  constructor(
    private authenticationService: AuthenticationService,
    private oidcSecurityService: OidcSecurityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.currentUser == null) {
      this.currentUser = this.authenticationService.currentUser;
    }

    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken }) => {
      console.log('App authenticated', isAuthenticated);

      if (isAuthenticated) {
        this.currentUser = this.authenticationService.currentUser;
        console.log('Is current user null', this.currentUser == null);
      }
    });
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  signout() {
    this.oidcSecurityService.logoff();
    this.router.navigate(['/']);
  }
}
