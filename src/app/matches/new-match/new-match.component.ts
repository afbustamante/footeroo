import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SitesService } from 'src/app/sites/sites.service';
import { Site } from 'src/app/sites/site';
import { Observable } from 'rxjs';

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
  sites$: Observable<Site[]>;

  constructor(
    private fb: FormBuilder,
    private sitesService: SitesService
  ) {}

  ngOnInit(): void {
    this.sites$ = this.sitesService.findSites();
  }

  onSubmit() {
  }
}
