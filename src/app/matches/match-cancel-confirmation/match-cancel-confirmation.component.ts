import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-match-cancel-confirmation',
  templateUrl: './match-cancel-confirmation.component.html',
  styleUrls: ['./match-cancel-confirmation.component.css']
})
export class MatchCancelConfirmationComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
  }

}
