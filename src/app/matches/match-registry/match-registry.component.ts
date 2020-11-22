import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { SitesService } from 'src/app/sites/sites.service';
import { Site } from 'src/app/sites/site';
import { MatchesService } from 'src/app/matches/matches.service';
import { Match } from '../match';

@Component({
  selector: 'app-match-registry',
  templateUrl: './match-registry.component.html',
  styleUrls: ['./match-registry.component.css']
})
export class MatchRegistryComponent implements OnInit {

  @Output()
  lastCreatedCode: string;

  basicMatchForm = this.fb.group({
    date: [null, Validators.required],
    time: [null, Validators.required],
    numPlayersMin: [null, Validators.min(1)],
    numPlayersMax: [null, Validators.min(1)],
    carpoolingEnabled: [true],
    codeSharingEnabled: [true]
  });

  matchSiteForm = this.fb.group({
    site: [null],
    name: [null, Validators.required],
    address: [null, Validators.required],
    phoneNumber: [null]
  });
  siteSelected = false;
  newSitePanelSelected = false;

  minDate = Date.now;
  sites$: Observable<Site[]>;

  constructor(
    private fb: FormBuilder,
    private messageSnackBar: MatSnackBar,
    private sitesService: SitesService,
    private matchesService: MatchesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sites$ = this.sitesService.findSites();
  }

  onSubmitMatchDetails() {
    if (this.basicMatchForm.value.numPlayersMin && this.basicMatchForm.value.numPlayersMax &&
      this.basicMatchForm.value.numPlayersMin > this.basicMatchForm.value.numPlayersMax) {
        // TODO Validation error for min and max values when both are entered
      }
  }

  selectSite() {
    this.siteSelected = true;
  }

  createWithSelectedSite() {
    const site = this.matchSiteForm.value.site;
    this.createMatch(site);
  }

  createWithNewSite() {
    const site: Site = {
      name: this.matchSiteForm.value.name,
      address: this.matchSiteForm.value.address,
      phoneNumber: this.matchSiteForm.value.phoneNumber
    };

    this.createMatch(site);
  }

  createMatch(site: Site) {
    const matchForm = this.basicMatchForm.value;

    const match: Match = {
      date: new Date(matchForm.date + 'T' + matchForm.time + ':00'),
      numPlayersMin: matchForm.numPlayersMin,
      numPlayersMax: matchForm.numPlayersMax,
      carpoolingEnabled: matchForm.carpoolingEnabled,
      codeSharingEnabled: matchForm.codeSharingEnabled,
      site
    };

    this.matchesService.createMatch(match).subscribe(
      response => {
        const location = response.headers.get('Location');
        this.publishMatchRegistrySuccess(location);
        this.router.navigate(['/list']);
      },
      error => {
        if (error.status === 400) {
          this.publishMatchRegistryFailure(error.error.message);
        }
      }
    );
  }

  private publishMatchRegistrySuccess(location: string) {
    const locationParts = location.split('/');
    const code = locationParts[locationParts.length - 1];
    this.lastCreatedCode = code;

    // TODO Translate this message
    let message = 'Match successfully created with the code ' + code + '. ';
    message += 'Copy and share this code with your friends for them to join this match. ';

    this.messageSnackBar.open(message, 'OK', {
      duration: 8000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  private publishMatchRegistryFailure(message: string) {
    this.messageSnackBar.open(message, 'OK', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }
}
