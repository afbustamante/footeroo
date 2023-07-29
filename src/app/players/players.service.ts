import { Injectable } from '@angular/core';
import { Player } from 'src/app/players/player';
import { map, Observable } from 'rxjs';
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
    return this.http.get<Player[]>(`${environment.coreApiUrl}/players`, options).pipe(map((players) => players[0]));
  }

  updatePlayerDetails(player: Player): Observable<HttpResponse<any>> {
    return this.http.put(`${environment.coreApiUrl}/players/${player.id}`, {
      first_name : player.first_name,
      surname : player.surname,
      phone_number : player.phone_number
    }, { observe : 'response'});
  }
}
