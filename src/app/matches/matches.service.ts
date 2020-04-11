import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Match } from './match';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  private matchesApiPath = '/matches';

  constructor(
    private http: HttpClient
  ) {}

  createMatch(match: Match): Observable<HttpResponse<any>> {
    return this.http.post(environment.apiUrl + this.matchesApiPath, match, { observe : 'response'});
  }

  loadMatch(code: string): Observable<Match | Object> {
    const url = environment.apiUrl + this.matchesApiPath;
    return this.http.get(`${url}/${code}`);
  }
}
