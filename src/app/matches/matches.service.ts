import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Match } from './match';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { MatchRegistration } from './match-registration';
import { Player } from '../players/player';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  constructor(
    private http: HttpClient
  ) {}

  createMatch(match: Match): Observable<HttpResponse<any>> {
    return this.http.post(`${environment.apiUrl}/matches`, match, { observe : 'response'});
  }

  findMatchByCode(code: string): Observable<Match> {
    return this.http.get<Match>(`${environment.apiUrl}/matches/${code}`);
  }

  findMatchesToPlay(): Observable<Match[]> {
    const today = formatDate(Date.now(), 'yyyy-MM-dd', 'en');
    return this.http.get<Match[]>(`${environment.apiUrl}/matches?startDate=${today}`);
  }

  findPlayedMatches(): Observable<Match[]> {
    const oneDayMilliseconds = 86400000;
    const yesterday = formatDate(Date.now() - oneDayMilliseconds, 'yyyy-MM-dd', 'en');
    return this.http.get<Match[]>(`${environment.apiUrl}/matches?endDate=${yesterday}`);
  }

  findCancelledMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(`${environment.apiUrl}/matches`)
      .pipe(
        map(matches =>
          matches.filter(match =>
            match.cancelled
          )
        ));
  }

  joinMatch(player: Player, match: Match): Observable<HttpResponse<any>> {
    const registration: MatchRegistration = {
      player
    };
    return this.http.post(`${environment.apiUrl}/matches/${match.code}/registrations`, registration, { observe : 'response'});
  }
}
