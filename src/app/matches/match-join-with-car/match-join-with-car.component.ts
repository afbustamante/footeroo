import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatchesService } from 'src/app/matches/matches.service';
import { Car } from 'src/app/cars/car';
import { CarsService } from 'src/app/cars/cars.service';
import { Player } from 'src/app/players/player';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { Match } from '../match';

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

  currentPlayer: Player;
  cars$: Observable<Car[]>;
  carSelected: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private messageSnackBar: MatSnackBar,
    private authenticationService: AuthenticationService,
    private carsService: CarsService,
    private matchesService: MatchesService,
    private router: Router
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
        this.router.navigate(['/matches/search']);
      }
    );
    this.cars$ = this.carsService.findCars();
    this.currentPlayer = this.authenticationService.currentUser;
    this.carSelected = false;
  }

  selectCar() {
    this.carSelected = true;
  }

  joinMatchWithExistingCar(): void {
    const car = this.registryForm.value.car;
    this.joinMatch(car);
  }

  joinMatchWithNewCar(): void {
    const car: Car = {
      name: this.registryForm.value.carName,
      numSeats: this.registryForm.value.carSeats
    };

    this.joinMatch(car);
  }

  joinMatch(car: Car): void {
    this.matchesService.joinMatch(this.currentPlayer, this.match, car).subscribe(
      data => {
        this.publishMatchJoinSuccess();
        this.router.navigate(['/matches/list']);
      },
      error => {
        this.messageSnackBar.open(error.headers.get('ctx-messages'), 'OK', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    );
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
