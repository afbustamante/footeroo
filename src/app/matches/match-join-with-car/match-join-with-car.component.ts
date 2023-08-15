import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatchesService } from 'src/app/matches/matches.service';
import { Car } from 'src/app/cars/car';
import { CarsService } from 'src/app/cars/cars.service';
import { Match } from '../match';
import { CarForm } from 'src/app/cars/car-form';

@Component({
  selector: 'app-match-join-with-car',
  templateUrl: './match-join-with-car.component.html',
  styleUrls: ['./match-join-with-car.component.css']
})
export class MatchJoinWithCarComponent implements OnInit {

  match: Match;
  newCarPanelSelected = false;

  registryForm = this.fb.group({
    carSeats: [null],
    carName: [null],
    car: [null]
  });

  cars$: Observable<Car[]>;
  carSelected: boolean;

  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private messageSnackBar: MatSnackBar,
    private carsService: CarsService,
    private matchesService: MatchesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const matchCode = this.route.snapshot.paramMap.get('code');
    this.matchesService.findMatchByCode(matchCode).subscribe({
      next: (data) => this.match = data,
      error: (error) => {
        this.messageSnackBar.open(error.error.message, 'OK', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
        this.router.navigate(['/search']);
      }
    });
    this.cars$ = this.carsService.findCars();
    this.carSelected = false;
  }

  selectCar() {
    this.carSelected = true;
  }

  joinMatchWithExistingCar(): void {
    const car = this.registryForm.value.car;
    this.joinMatch(car.id);
  }

  joinMatchWithNewCar(): void {
    const car: CarForm = {
      name: this.registryForm.value.carName,
      num_seats: this.registryForm.value.carSeats
    };

    this.carsService.createCar(car).subscribe({
      next: (response) => {
        const location = response.headers.get('Location');
        const locationParts = location.split('/');
        const carId = locationParts[locationParts.length - 1];

        this.joinMatch(Number.parseInt(carId).valueOf());
      },
      error: (error) => {
        this.messageSnackBar.open(error.error.message, 'OK', {
          duration: 500,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    });
  }

  joinMatch(carId: number): void {
    this.matchesService.joinMatch(this.match, carId).subscribe({
      next: (response) => {
        this.publishMatchJoinSuccess();
        this.router.navigate(['/list']);
      },
      error: (error) => {
        this.messageSnackBar.open(error.error.message, 'OK', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    });
  }

  publishMatchJoinSuccess() {
    // TODO Translate this message
    this.messageSnackBar.open('You have successfully joined this match', 'OK', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }
}
