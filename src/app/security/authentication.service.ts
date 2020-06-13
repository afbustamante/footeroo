import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Credentials } from './credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  public get currentUser(): User {
    const currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    return currentUserSubject.value;
  }

  signIn(email: string, password: string): Observable<HttpResponse<any>> {
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

  sendPasswordResetToken(email: string): Observable<HttpResponse<any>> {
    const params = {};
    return this.http.post(`${environment.apiUrl}/users/${email}/token`, params, { observe : 'response'});
  }

  /* Only used for password reset */
  findUserByToken(token: string): Observable<User> {
    const options = { params: new HttpParams().set('token', token) };
    return this.http.get<User>(`${environment.apiUrl}/users`, options);
  }

  updateCredentials(user: User, credentials: Credentials): Observable<HttpResponse<any>> {
    return this.http.patch(`${environment.apiUrl}/users/${user.email}/details`, credentials, { observe : 'response'});
  }
}
