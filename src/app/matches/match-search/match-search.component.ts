import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-match-search',
  templateUrl: './match-search.component.html',
  styleUrls: ['./match-search.component.css']
})
export class MatchSearchComponent implements OnInit {

  searchForm = this.fb.group({
    matchCode: [null, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
  }

  onSubmit() {
  }
}
