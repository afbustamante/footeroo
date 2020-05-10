import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Match } from '../match';
import { MatchesService } from '../matches.service';

@Component({
  selector: 'app-match-view-dialog',
  templateUrl: './match-view-dialog.component.html',
  styleUrls: ['./match-view-dialog.component.css']
})
export class MatchViewDialogComponent implements OnInit {

  match: Match;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matchesService: MatchesService
  ) {}

  ngOnInit(): void {
    this.matchesService.findMatchByCode(this.data.code).subscribe(
      data => {
        this.match = data;
      }
    );
  }
}
