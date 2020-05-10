import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Match } from '../match';
import { MatchesService } from '../matches.service';
import { MatchViewDialogComponent } from '../match-view-dialog/match-view-dialog.component';

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

  constructor(
    private matchesService: MatchesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.matchesToPlay$ = this.matchesService.findMatchesToPlay();
    this.playedMatches$ = this.matchesService.findPlayedMatches();
    /*
    this.cancelledMatches$ = this.matchesService.findCancelledMatches();
    */
  }

  showMatchDetail(matchCode: string): void {
    this.dialog.open(MatchViewDialogComponent, {
      data: {
        code: matchCode
      }
    });
  }
}
