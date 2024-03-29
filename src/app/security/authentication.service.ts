import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';
import { OidcSecurityService, UserDataResult } from 'angular-auth-oidc-client';
import { PlayersService } from '../players/players.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData$: Observable<UserDataResult>;
  isAuthenticated = false;
  currentUserSubject: BehaviorSubject<User>;

  constructor(
    private oidcSecurityService: OidcSecurityService,
    private playersService: PlayersService
  ) {}

  public get currentUser(): User {
    this.userData$ = this.oidcSecurityService.userData$;
    this.userData$.subscribe(data => {
      if (data.userData != null) {
        this.currentUserSubject = new BehaviorSubject<User>({
          first_name: data.userData['given_name'],
          surname: data.userData['family_name'],
          email: data.userData['email']
        });

        this.playersService.loadPlayerByEmail(data.userData['email']).subscribe(
          player => localStorage.setItem('player_id', player.id.toString())
        );
      } else {
        this.currentUserSubject = new BehaviorSubject<User>(null);
      }
    });

    if (this.currentUserSubject !== null) {
      return this.currentUserSubject.value;
    } else {
      return null;
    }
  }
}
