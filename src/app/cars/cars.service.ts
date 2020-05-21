import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { Car } from './car';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { MatchRegistration } from '../matches/match-registration';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(
    private http: HttpClient
  ) {}

  findCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${environment.apiUrl}/cars`).pipe(
      catchError(err => {
        console.log(`Could not get cars list for active player. Got ${err.status} error code.`);
        return EMPTY;
      })
    );
  }

  loadCar(id: number): Observable<Car> {
    return this.http.get<Car>(`${environment.apiUrl}/cars/${id}`);
  }

  findCarsByMatch(matchCode: string): Observable<Car[]> {
    return this.http.get<MatchRegistration[]>(`${environment.apiUrl}/matches/${matchCode}/registrations`).pipe(
      catchError(err => {
        console.log(`Could not get cars list from a match. Got ${err.status} error code.`);
        return EMPTY;
      }),
      map(registrations => registrations.filter(r => r.car != null)),
      map(this.filterCarsFromRegistrations),
      map(cars => Array.from(new Set(cars)))
    );
  }

  private filterCarsFromRegistrations(registrations: MatchRegistration[]): Car[] {
    const cars = [];
    registrations.forEach(reg => cars.push(reg.car));
    return cars;
  }
}
