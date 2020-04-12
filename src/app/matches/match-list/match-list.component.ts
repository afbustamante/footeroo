import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../matches.service';
import { Match } from '../match';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {

  matchesToPlay$: Observable<Match[]>;
  playedMatches$: Observable<Match[]>;
  cancelledMatches$: Observable<Match[]>;

  constructor(
    private matchesService: MatchesService
  ) {}

  ngOnInit(): void {
    this.matchesToPlay$ = this.matchesService.findMatchesToPlay();
    this.playedMatches$ = this.matchesService.findPlayedMatches();
    this.matchesToPlay$ = this.matchesService.findCancelledMatches();
  }
}
