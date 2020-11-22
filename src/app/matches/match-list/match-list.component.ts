import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Match } from '../match';
import { User } from 'src/app/security/user';
import { MatchesService } from '../matches.service';
import { MatchViewDialogComponent } from '../match-view-dialog/match-view-dialog.component';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { MatchJoinConfirmationComponent } from '../match-join-confirmation/match-join-confirmation.component';

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
 currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private matchesService: MatchesService,
    private messageSnackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.matchesToPlay$ = this.matchesService.findMatchesToPlay();
    this.playedMatches$ = this.matchesService.findPlayedMatches();
    /*
    this.cancelledMatches$ = this.matchesService.findCancelledMatches();
    */
    this.currentUser = this.authenticationService.currentUser;
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
          this.matchesService.joinMatch(this.currentUser, match).subscribe(
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
          this.router.navigate([`/match/${match.code}/join-with-car`]);
        } else if (result === 'JOIN_WITHOUT_CAR') {
          this.router.navigate([`/match/${match.code}/join-without-car`]);
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
}
