import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Site } from './site';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../security/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SitesService {

  private sitesApiPath = '/sites';

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  findSites(): Observable<Site[]> {
    return this.http.get<Site[]>(environment.apiUrl + this.sitesApiPath, {
        headers: new HttpHeaders().set('player', this.authenticationService.currentUser.email)
      })
      .pipe(
        catchError(this.handleError<Site[]>('findSites', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
