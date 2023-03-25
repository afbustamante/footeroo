import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { Match } from '../match';
import { MatchesService } from '../matches.service';
import { Car } from 'src/app/cars/car';
import { CarsService } from 'src/app/cars/cars.service';

@Component({
  selector: 'app-match-join-without-car',
  templateUrl: './match-join-without-car.component.html',
  styleUrls: ['./match-join-without-car.component.css']
})
export class MatchJoinWithoutCarComponent implements OnInit {

  match: Match;
  cars$: Observable<Car[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private matchesService: MatchesService,
    private carsService: CarsService,
    private messageSnackBar: MatSnackBar
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
      }
    });
    this.cars$ = this.carsService.findCarsByMatch(matchCode);
  }

  joinMatchUsingCar(carId: number) {
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
