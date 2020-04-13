import { Component, OnInit } from '@angular/core';
import { User } from './security/user';
import { AuthenticationService } from './security/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  currentUser: User;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.currentUser == null) {
      this.currentUser = this.authenticationService.currentUser;
    }
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  signout() {
    this.authenticationService.signOut();
    this.currentUser = null;
    this.router.navigate(['/']);
  }
}
