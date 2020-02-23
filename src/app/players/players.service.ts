import { Injectable } from '@angular/core';
import { Player } from 'src/app/players/player';
import { Observable } from 'rxjs';
import { ApiRequestService } from '../commons/api-request.service';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private apiRequestService: ApiRequestService) { }

  registerPlayer(player: Player): Observable<number> {
    return this.apiRequestService.post('/users', player);
  }
}
