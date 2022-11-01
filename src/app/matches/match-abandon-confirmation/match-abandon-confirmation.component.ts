import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-match-abandon-confirmation',
  templateUrl: './match-abandon-confirmation.component.html',
  styleUrls: ['./match-abandon-confirmation.component.css']
})
export class MatchAbandonConfirmationComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log('Match abandon confirmation requested');
  }

}
