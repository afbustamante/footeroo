import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Match } from '../match';
import { MatchesService } from '../matches.service';
import { Player } from 'src/app/players/player';
import { MatchRegistration } from '../match-registration';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { Car } from 'src/app/cars/car';
import { CarsService } from 'src/app/cars/cars.service';
import { User } from 'src/app/security/user';
import { PlayersService } from 'src/app/players/players.service';

@Component({
  selector: 'app-match-carpool',
  templateUrl: './match-carpool.component.html',
  styleUrls: ['./match-carpool.component.css']
})
export class MatchCarpoolComponent implements OnInit {

  playersAvailableForCarpool: boolean;
  match: Match;
  requestingPlayers: Player[];
  formerlyConfirmedPlayers: Player[];
  confirmedPlayers: Player[];
  currentPlayer: Player;
  currentCar: Car;
  isDriver: boolean;
  changesUnsaved: boolean;

  carpoolForm = this.fb.group({
    requestingPlayersSelection: [null],
    confirmedPlayersSelection: [null]
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private messageSnackBar: MatSnackBar,
    private authenticationService: AuthenticationService,
    private matchesService: MatchesService,
    private playersService: PlayersService,
    private carsService: CarsService
  ) { }

  ngOnInit(): void {
    const currentUser = this.authenticationService.currentUser;
    this.playersService.loadPlayerByEmail(currentUser.email).subscribe({
      next: (player) => {
        this.currentPlayer = player;
      },
      error: (error) => {
        console.error('Unable to get the active player', error.error);
      }
    });

    const matchCode = this.route.snapshot.paramMap.get('code');
    this.loadMatch(matchCode);
  }

  private loadMatch(matchCode: string) {
    this.matchesService.findMatchByCode(matchCode).subscribe({
      next: (data) => {
        this.match = data;
        this.loadMatchRegistrations(matchCode);
      },
      error: (error) => {
        this.messageSnackBar.open(error.error.message, 'OK', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
        this.router.navigate(['/search']);
      }
    });
  }

  loadMatchRegistrations(matchCode: string) {
    this.matchesService.findMatchRegistrations(matchCode).subscribe({
      next: (data) => {
        this.processCurrentCar(data);
        this.initPlayersLists(data);
      }
    });
  }

  processCurrentCar(registrations?: MatchRegistration[]) {
    if (registrations) {
      // Find current player's registered car
      registrations.forEach(reg => {
        if (reg.player.id === this.currentPlayer.id) {
          this.currentCar = reg.car;
        }
      });

      if (this.currentCar) {
        this.carsService.loadCar(this.currentCar.id).subscribe({
          next: (data) => {
            // Use the full detail of the car including driver's information
            this.currentCar = data;
            this.isDriver = (data.driver && data.driver.id === this.currentPlayer.id);
          },
          error: (error) => {
            if (error.status === 403) {
              this.isDriver = false;
            } else {
              this.messageSnackBar.open(error.error.message, 'OK', {
                duration: 5000,
                horizontalPosition: 'right',
                verticalPosition: 'top'
              });
            }
          }
        });
      }
    }
  }

  initPlayersLists(registrations?: MatchRegistration[]) {
    if (registrations) {
      if (this.currentCar) {
        this.requestingPlayers = [];
        this.confirmedPlayers = [];
        this.formerlyConfirmedPlayers = [];

        // Find the players that chose this car (confirmed or not)
        registrations.forEach(reg => {
          if (reg.car && reg.car.id === this.currentCar.id) {
            this.sendRegistrationToCarpoolList(reg);
          }
        });
      }
    }
  }

  private sendRegistrationToCarpoolList(reg: MatchRegistration) {
    this.playersAvailableForCarpool = true;

    if (reg.car_confirmed) {
      if (reg.player.id !== this.currentPlayer.id) {
        this.confirmedPlayers.push(reg.player);
        this.formerlyConfirmedPlayers.push(reg.player);
      }
    } else {
      this.requestingPlayers.push(reg.player);
    }
  }

  candidatesSelected(): boolean {
    return this.carpoolForm.value.requestingPlayersSelection && this.carpoolForm.value.requestingPlayersSelection.length > 0;
  }

  passengersSelected(): boolean {
    return this.carpoolForm.value.confirmedPlayersSelection && this.carpoolForm.value.confirmedPlayersSelection.length > 0;
  }

  addPassengers(): void {
    this.changesUnsaved = true;

    const selectedPlayers: Player[] = this.carpoolForm.value.requestingPlayersSelection;

    selectedPlayers.forEach(player => {
      this.confirmedPlayers.push(player);
      this.requestingPlayers = this.requestingPlayers.filter(p => p.id !== player.id);
    });
  }

  removePassengers(): void {
    this.changesUnsaved = true;

    const selectedPlayers: Player[] = this.carpoolForm.value.confirmedPlayersSelection;

    selectedPlayers.forEach(player => {
      this.requestingPlayers.push(player);
      this.confirmedPlayers = this.confirmedPlayers.filter(p => p.id !== player.id);
    });
  }

  onSubmit(): void {
    if (this.isDriver) {
      const playersNotUpdated = [];

      this.confirmedPlayers.forEach(player => {
        if (!this.formerlyConfirmedPlayers.includes(player)) {
          // The player was added to the confirmed players list
          this.matchesService.updateCarForPlayerRegistration(this.match, player, this.currentCar, true).subscribe({
            error: (error) => {
              console.log(error.error.message);
              playersNotUpdated.push(player);
            }
          });
        }
      });

      this.requestingPlayers.forEach(player => {
        if (this.formerlyConfirmedPlayers.includes(player)) {
          // The player was removed from the confirmed players list
          this.matchesService.updateCarForPlayerRegistration(this.match, player, this.currentCar, false).subscribe({
            error: (error) => {
              console.log(error.error.message);
              playersNotUpdated.push(player);
            }
          });
        }
      });

      if (playersNotUpdated.length === 0) {
        this.publishUpdateSuccess();
        this.router.navigate(['/list']);
      } else {
        this.publishUpdateFail(playersNotUpdated);
      }
    }
  }

  publishUpdateSuccess() {
    // TODO Translate this message
    this.messageSnackBar.open('You have successfully updated your carpooling list for this match', 'OK', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  publishUpdateFail(players: Player[]) {
    // TODO Translate this message
    let message = 'A problem came when updating carpooling confirmations for the following players: ';
    let firstOne = true;

    players.forEach(p => {
      if (firstOne) {
        message += p.first_name;
        firstOne = false;
      } else {
        message += ', ' + p.first_name;
      }
    });

    this.messageSnackBar.open(message, 'OK', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }
}
