import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Match } from './match';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { formatDate } from '@angular/common';

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

  loadMatch(code: string): Observable<Match | object> {
    const url = environment.apiUrl + this.matchesApiPath;
    return this.http.get(`${url}/${code}`);
  }

  findMatchesToPlay(): Observable<Match[]> {
    const today = formatDate(Date.now(), 'yyyy-MM-dd', 'en');
    return this.http.get<Match[]>(environment.apiUrl + this.matchesApiPath + '?startDate=' + today);
  }

  findPlayedMatches(): Observable<Match[]> {
    const oneDayMilliseconds = 86400000;
    const yesterday = formatDate(Date.now() - oneDayMilliseconds, 'yyyy-MM-dd', 'en');
    return this.http.get<Match[]>(environment.apiUrl + this.matchesApiPath + '?endDate=' + yesterday);
  }

  findCancelledMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(environment.apiUrl + this.matchesApiPath)
      .pipe(
        map(matches =>
          matches.filter(match =>
            match.cancelled
          )
        ));
  }
}
