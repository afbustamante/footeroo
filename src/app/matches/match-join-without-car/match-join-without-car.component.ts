import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private matchesService: MatchesService,
    private carsService: CarsService,
    private messageSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const matchCode = this.route.snapshot.paramMap.get('code');
    this.matchesService.findMatchByCode(matchCode).subscribe(
      data => this.match = data,
      error => {
        this.messageSnackBar.open(error.headers.get('ctx-messages'), 'OK', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    );
    this.cars$ = this.carsService.findCarsByMatch(matchCode);
  }

}
