import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Match } from './match';
import { environment } from 'src/environments/environment';
import { formatDate } from '@angular/common';
import { MatchRegistration } from './match-registration';
import { Player } from '../players/player';
import { Car } from '../cars/car';
import { MatchForm } from './match-form';
import { MatchRegistrationForm } from './match-registration-form';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  constructor(
    private http: HttpClient
  ) {}

  createMatch(match: MatchForm): Observable<HttpResponse<any>> {
    return this.http.post(`${environment.coreApiUrl}/matches`, match, { observe : 'response'});
  }

  findMatchByCode(code: string): Observable<Match> {
    return this.http.get<Match>(`${environment.coreApiUrl}/matches/${code}`);
  }

  findMatchesToPlay(): Observable<Match[]> {
    const today = formatDate(Date.now(), 'yyyy-MM-dd', 'en');
    return this.http.get<Match[]>(`${environment.coreApiUrl}/matches?start_date=${today}`);
  }

  findPlayedMatches(): Observable<Match[]> {
    const oneDayMilliseconds = 86400000;
    const yesterday = formatDate(Date.now() - oneDayMilliseconds, 'yyyy-MM-dd', 'en');
    return this.http.get<Match[]>(`${environment.coreApiUrl}/matches?end_date=${yesterday}`);
  }

  findMatchRegistrations(code: string): Observable<MatchRegistration[]> {
    return this.http.get<MatchRegistration[]>(`${environment.coreApiUrl}/matches/${code}/registrations`);
  }

  joinMatch(match: Match, carId?: number): Observable<HttpResponse<any>> {
    let registration: MatchRegistrationForm;
    
    if (carId) {
      registration = {
        'car_id': carId
      };
    } else {
      registration = {};
    } 
    return this.http.post(`${environment.coreApiUrl}/matches/${match.code}/registrations`, registration, { observe : 'response'});
  }

  quitMatch(match: Match): Observable<HttpResponse<any>> {
    const playerId = localStorage.getItem('player_id');
    return this.http.delete(`${environment.coreApiUrl}/matches/${match.code}/registrations/${playerId}`, { observe : 'response' });
  }

  cancelMatch(match: Match): Observable<HttpResponse<any>> {
    return this.http.delete(`${environment.coreApiUrl}/matches/${match.code}`, { observe : 'response' });
  }

  updateCarForPlayerRegistration(match: Match, player: Player, car: Car, confirmed: boolean): Observable<HttpResponse<any>> {
    return this.http.patch(`${environment.coreApiUrl}/matches/${match.code}/registrations/${player.id}`, {
      'car_id': car.id,
      'confirmed': confirmed
    }, {observe: 'response'});
  }
}
