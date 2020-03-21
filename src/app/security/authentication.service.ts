import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  public get currentUser(): User {
    const currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    return currentUserSubject.value;
  }

  signIn(email: string, password: string) {
    password = btoa(password); // Base64 encoded password

    return this.http.put<any>(`${environment.apiUrl}/users/${email}/auth`, { email, password })
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
      }));
  }

  signOut() {
    localStorage.removeItem('currentUser');
  }
}
