import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-match',
  templateUrl: './new-match.component.html',
  styleUrls: ['./new-match.component.css']
})
export class NewMatchComponent implements OnInit {

  registryForm = this.fb.group({
    date: [null, Validators.required],
    time: [null, Validators.required],
    numPlayersMin: [null],
    numPlayersMax: [null],
    site: [null, Validators.required]
  });

  minDate = Date.now;
  sites = [];

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
  }

  onSubmit() {
  }
}
