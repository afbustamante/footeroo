import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, shareReplay } from 'rxjs';
import { Match } from '../match';
import { MatchesService } from '../matches.service';
import { MatchViewDialogComponent } from '../match-view-dialog/match-view-dialog.component';
import { MatchJoinConfirmationComponent } from '../match-join-confirmation/match-join-confirmation.component';
import { MatchAbandonConfirmationComponent } from '../match-abandon-confirmation/match-abandon-confirmation.component';
import { MatchCancelConfirmationComponent } from '../match-cancel-confirmation/match-cancel-confirmation.component';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {

  matchesToPlay$: Observable<Match[]>;
  playedMatches$: Observable<Match[]>;

  constructor(
    private router: Router,
    private matchesService: MatchesService,
    private messageSnackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.matchesToPlay$ = this.matchesService.findMatchesToPlay().pipe(shareReplay());
    this.playedMatches$ = this.matchesService.findPlayedMatches().pipe(shareReplay());
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
        carpoolingEnabled: match.carpooling_enabled
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result === 'JOIN_ONLY') {
          this.matchesService.joinMatch(match).subscribe({
            next: (response) => {
              this.publishMatchTransportationUpdateSuccess();
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
        matchDate: match.date
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.matchesService.quitMatch(match).subscribe({
          next: (response) => {
            this.publishMatchAbandonSuccess();
            this.matchesToPlay$ = this.matchesService.findMatchesToPlay();
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
    });
  }

  showMatchCancelConfirmationDialog(match: Match): void {
    const dialogRef = this.dialog.open(MatchCancelConfirmationComponent, {
      width: '400px',
      data: {
        matchCode: match.code,
        matchDate: match.date
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.matchesService.cancelMatch(match).subscribe({
          next: (response) => {
            this.publishMatchCancelSuccess();
            this.matchesToPlay$ = this.matchesService.findMatchesToPlay();
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

  publishMatchCancelSuccess() {
    // TODO Translate this message
    this.publishSuccessMessage('You have successfully cancelled this match');
  }

  publishSuccessMessage(message: string) {
    this.messageSnackBar.open(message, 'OK', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }
}
