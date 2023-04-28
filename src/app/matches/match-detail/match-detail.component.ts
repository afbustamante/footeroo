import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Match } from '../match';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { MatchJoinConfirmationComponent } from '../match-join-confirmation/match-join-confirmation.component';
import { MatchesService } from '../matches.service';
import { MatchRegistration } from '../match-registration';
import { Player } from 'src/app/players/player';
import { PlayersService } from 'src/app/players/players.service';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css']
})
export class MatchDetailComponent implements OnInit {

  @Input()
  mode: string;

  @Input()
  code: string;

  @Input()
  match: Match;

  registrations: MatchRegistration[];

  playerAlreadyRegistered: boolean;
  pastMatch: boolean;
  placesAvailable: boolean;
  currentPlayer: Player;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private matchesService: MatchesService,
    private playersService: PlayersService,
    private messageSnackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    const currentUser = this.authenticationService.currentUser;

    this.playersService.loadPlayerByEmail(currentUser.email).subscribe({
      next: (player) => {
        this.currentPlayer = player;

        this.matchesService.findMatchRegistrations(this.code).subscribe(
          data => {
    
            this.registrations = data;

            if (this.currentPlayer) {
              this.registrations.forEach(reg => {
                if (reg.player.id === this.currentPlayer.id) {
                  this.playerAlreadyRegistered = true;
                }
              });
            } else {
              this.playerAlreadyRegistered = false;
            }
          }
        );
      }
    });

    this.pastMatch = (this.match) && (new Date(this.match.date) < new Date());
    this.placesAvailable = (this.match) && (
      (this.match.num_players_max && this.match.num_players_max > this.match.num_registered_players) || (this.match.num_players_max == null)
    );
  }

  openMatchJoinConfirmationDialog(): void {
    const dialogRef = this.dialog.open(MatchJoinConfirmationComponent, {
      width: '400px',
      data: {
        matchCode: this.match.code,
        matchDate: this.match.date,
        carpoolingEnabled: this.match.carpooling_enabled
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result === 'JOIN_ONLY') {
          this.matchesService.joinMatch(this.match).subscribe({
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
        } else if (result === 'JOIN_WITH_CAR') {
          this.router.navigate([`/match/${this.match.code}/join-with-car`]);
        } else if (result === 'JOIN_WITHOUT_CAR') {
          this.router.navigate([`/match/${this.match.code}/join-without-car`]);
        }
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

  publishMatchJoinFail() {
    // TODO Translate this message
    const message = 'There is a problem with your request.';

    this.messageSnackBar.open(message, 'OK', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }
}
