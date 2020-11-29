import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Match } from '../match';
import { Player } from 'src/app/players/player';
import { MatchesService } from '../matches.service';
import { MatchViewDialogComponent } from '../match-view-dialog/match-view-dialog.component';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { MatchJoinConfirmationComponent } from '../match-join-confirmation/match-join-confirmation.component';
import { MatchAbandonConfirmationComponent } from '../match-abandon-confirmation/match-abandon-confirmation.component';
import { PlayersService } from 'src/app/players/players.service';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {

  matchesToPlay$: Observable<Match[]>;
  playedMatches$: Observable<Match[]>;
  /*
  cancelledMatches$: Observable<Match[]>;
  */
 currentPlayer: Player;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private matchesService: MatchesService,
    private playersService: PlayersService,
    private messageSnackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.matchesToPlay$ = this.matchesService.findMatchesToPlay();
    this.playedMatches$ = this.matchesService.findPlayedMatches();
    /*
    this.cancelledMatches$ = this.matchesService.findCancelledMatches();
    */
    const currentUser = this.authenticationService.currentUser;

    if (currentUser) {
      this.playersService.loadPlayerByEmail(currentUser.email).subscribe(
        data => {
          this.currentPlayer = data;
        }
      );
    }
  }

  showMatchDetail(matchCode: string): void {
    this.dialog.open(MatchViewDialogComponent, {
      data: {
        code: matchCode
      }
    });
  }

  showCarpoolingOptions(matchCode: string): void {
    this.router.navigate([`/match/${matchCode}/carpooling`]);
  }

  showMatchJoinConfirmationDialog(match: Match): void {
    const dialogRef = this.dialog.open(MatchJoinConfirmationComponent, {
      width: '400px',
      data: {
        matchCode: match.code,
        matchDate: match.date,
        carpoolingEnabled: match.carpoolingEnabled
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result === 'JOIN_ONLY') {
          this.matchesService.joinMatch(this.currentPlayer, match).subscribe(
            response => {
              this.publishMatchTransportationUpdateSuccess();
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
          this.router.navigate([`/match/${match.code}/join-with-car`]);
        } else if (result === 'JOIN_WITHOUT_CAR') {
          this.router.navigate([`/match/${match.code}/join-without-car`]);
        }
      }
    });
  }

  showMatchAbandonConfirmationDialog(match: Match): void {
    const dialogRef = this.dialog.open(MatchAbandonConfirmationComponent, {
      width: '400px',
      data: {
        matchCode: match.code,
        matchDate: match.date,
        carpoolingEnabled: match.carpoolingEnabled
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.matchesService.quitMatch(this.currentPlayer, match).subscribe(
          response => {
            this.publishMatchAbandonSuccess();
            this.matchesToPlay$ = this.matchesService.findMatchesToPlay();
          },
          error => {
            this.messageSnackBar.open(error.error.message, 'OK', {
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
          }
        );
      }
    });
  }

  publishMatchTransportationUpdateSuccess() {
    // TODO Translate this message
    this.publishSuccessMessage('You have successfully updated your transportation options for this match');
  }

  publishMatchAbandonSuccess() {
    // TODO Translate this message
    this.publishSuccessMessage('You have successfully quitted this match');
  }

  publishSuccessMessage(message: string) {
    this.messageSnackBar.open(message, 'OK', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }
}
