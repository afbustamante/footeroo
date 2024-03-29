import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  @Output() signInUserEvent = new EventEmitter<User>();

  destination: string;

  isAuthenticated = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private oidcSecurityService: OidcSecurityService,
  ) {}

  ngOnInit() {
    this.oidcSecurityService.isAuthenticated$.subscribe(({ isAuthenticated }) => {
      this.isAuthenticated = isAuthenticated;

      console.warn('User authenticated: ', isAuthenticated);

      if (isAuthenticated) {
        this.destination = this.route.snapshot.queryParams.dest || '/';
        this.router.navigate([this.destination]);
      }
    });
  }

  onSubmit() {
    this.oidcSecurityService.authorize();
  }
}
