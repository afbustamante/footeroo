import { Injectable } from '@angular/core';
import { Player } from 'src/app/players/player';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(
    private http: HttpClient
  ) {}

  loadPlayerByEmail(email: string): Observable<Player> {
    const options = (email) ? { params: new HttpParams().set('email', email) } : {};
    return this.http.get<Player>(`${environment.apiUrl}/players`, options);
  }

  registerPlayer(player: Player): Observable<HttpResponse<any>> {
    return this.http.post(`${environment.apiUrl}/players`, player, { observe : 'response'});
  }
}
