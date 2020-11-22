import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Match } from '../match';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { MatchJoinConfirmationComponent } from '../match-join-confirmation/match-join-confirmation.component';
import { MatchesService } from '../matches.service';
import { User } from 'src/app/security/user';
import { MatchRegistration } from '../match-registration';

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
  currentUser: User;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private matchesService: MatchesService,
    private messageSnackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUser;
    this.matchesService.findMatchRegistrations(this.code).subscribe(
      data => {
        this.registrations = data;
        this.registrations.forEach(reg => {
          if (reg.player.email === this.currentUser.email) {
            this.playerAlreadyRegistered = true;
          }
        });
      }
    );
    this.pastMatch = (this.match) && (new Date(this.match.date) < new Date());
    this.placesAvailable = (this.match) && (
      (this.match.numPlayersMax && this.match.numPlayersMax > this.match.numRegisteredPlayers) || (this.match.numPlayersMax == null)
    );
  }

  openMatchJoinConfirmationDialog(): void {
    const dialogRef = this.dialog.open(MatchJoinConfirmationComponent, {
      width: '400px',
      data: {
        matchCode: this.match.code,
        matchDate: this.match.date,
        carpoolingEnabled: this.match.carpoolingEnabled
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result === 'JOIN_ONLY') {
          this.matchesService.joinMatch(this.currentUser, this.match).subscribe(
            response => {
              this.publishMatchJoinSuccess();
              this.router.navigate(['/list']);
            },
            error => {
              this.messageSnackBar.open(error.error.message, 'OK', {
                duration: 5000,
                horizontalPosition: 'right',
                verticalPosition: 'top'
              });
            }
          );
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
