import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { Car } from './car';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { MatchRegistration } from '../matches/match-registration';
import { CarForm } from './car-form';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(
    private http: HttpClient
  ) {}

  findCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${environment.coreApiUrl}/cars`).pipe(
      catchError(err => {
        console.log(`Could not get cars list for active player. Got ${err.status} error code.`);
        console.error(err);
        return EMPTY;
      })
    );
  }

  loadCar(id: number): Observable<Car> {
    return this.http.get<Car>(`${environment.coreApiUrl}/cars/${id}`);
  }

  findCarsByMatch(matchCode: string): Observable<Car[]> {
    return this.http.get<Car[]>(`${environment.coreApiUrl}/matches/${matchCode}/cars`);
  }

  createCar(car: CarForm): Observable<HttpResponse<any>> {
    return this.http.post(`${environment.coreApiUrl}/cars`, car, { observe : 'response'});
  }

  removeCar(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${environment.coreApiUrl}/cars/${id}`, { observe : 'response'});
  }

  private filterCarsFromRegistrations(registrations: MatchRegistration[]): Car[] {
    const cars = [];
    registrations.forEach(reg => cars.push(reg.car));
    return cars;
  }
}
