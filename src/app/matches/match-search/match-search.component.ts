import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatchesService } from '../matches.service';
import { Match } from '../match';

@Component({
  selector: 'app-match-search',
  templateUrl: './match-search.component.html',
  styleUrls: ['./match-search.component.css']
})
export class MatchSearchComponent implements OnInit {

  searchForm = this.fb.group({
    matchCode: [null, [Validators.required, Validators.pattern('^[A-Z]{10,12}$')]]
  });
  requestSent: boolean;
  match: Match;

  constructor(
    private fb: FormBuilder,
    private matchesService: MatchesService
  ) {}

  ngOnInit(): void {
    this.requestSent = false;
  }

  onSubmit() {
    this.requestSent = true;
    this.matchesService.findMatchByCode(this.searchForm.value.matchCode).subscribe(
      data => {
        this.match = data;
      },
      error => {
        console.log('Unable to find a match for this code.');
      }
    );
  }

  resetMatch() {
    this.match = null;
    this.requestSent = false;
  }
}
