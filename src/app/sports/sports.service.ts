import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sport } from './sport';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SportsService {

  constructor(
    private http: HttpClient
  ) { }

  findSports(): Observable<Sport[]> {
    return this.http.get<Sport[]>(`${environment.apiUrl}/sports`);
  }
}
