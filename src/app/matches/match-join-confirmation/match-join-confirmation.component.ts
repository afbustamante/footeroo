import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-match-join-confirmation',
  templateUrl: './match-join-confirmation.component.html',
  styleUrls: ['./match-join-confirmation.component.css']
})
export class MatchJoinConfirmationComponent implements OnInit {

  joinMode: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
  }
}
