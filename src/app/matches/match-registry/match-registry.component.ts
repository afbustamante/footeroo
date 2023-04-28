import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { SitesService } from 'src/app/sites/sites.service';
import { Site } from 'src/app/sites/site';
import { MatchesService } from 'src/app/matches/matches.service';
import { MatchForm } from '../match-form';
import { SiteForm } from 'src/app/sites/site-form';
import { Sport } from 'src/app/sports/sport';
import { SportsService } from 'src/app/sports/sports.service';

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
    sport: [null, Validators.required],
    numPlayersMin: [null, Validators.min(1)],
    numPlayersMax: [null, Validators.min(1)],
    carpoolingEnabled: [true],
    codeSharingEnabled: [true]
  });

  matchSiteForm = this.fb.group({
    site: [null],
    name: [null, Validators.required],
    address: [null, Validators.required],
    phoneNumber: [null],
    postCode: [null],
    city: [null],
    country: [null],
  });
  siteSelected = false;
  newSitePanelSelected = false;

  minDate = Date.now;
  sites$: Observable<Site[]>;
  sports$: Observable<Sport[]>;

  constructor(
    private fb: FormBuilder,
    private messageSnackBar: MatSnackBar,
    private sitesService: SitesService,
    private matchesService: MatchesService,
    private sportsService: SportsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sites$ = this.sitesService.findSites();
    this.sports$ = this.sportsService.findSports();
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
    this.createMatch(site.id);
  }

  createWithNewSite() {
    const site: SiteForm = {
      name: this.matchSiteForm.value.name,
      address: this.matchSiteForm.value.address,
      phone_number: this.matchSiteForm.value.phoneNumber,
      post_code: this.matchSiteForm.value.postCode,
      city: this.matchSiteForm.value.city,
      country: this.matchSiteForm.value.country,
    };

    this.sitesService.createSite(site).subscribe(
      {
        next: (response) => {
          const location = response.headers.get('Location');
          const locationParts = location.split('/');
          const siteId = locationParts[locationParts.length - 1];

          this.createMatch(Number.parseInt(siteId).valueOf());
        },
        error: (error) => {
          this.messageSnackBar.open(error.error.message, 'OK', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
        }
      }
    );
  }

  createMatch(siteId: number) {
    const matchForm = this.basicMatchForm.value;

    const match: MatchForm = {
      date: new Date(matchForm.date + 'T' + matchForm.time + ':00'),
      num_players_min: matchForm.numPlayersMin,
      num_players_max: matchForm.numPlayersMax,
      carpooling_enabled: matchForm.carpoolingEnabled,
      code_sharing_enabled: matchForm.codeSharingEnabled,
      sport: matchForm.sport,
      site_id: siteId,
    };

    this.matchesService.createMatch(match).subscribe({
      next: (response) => {
        const location = response.headers.get('Location');
        this.publishMatchRegistrySuccess(location);
        this.router.navigate(['/list']);
      },
      error: (error) => {
        if (error.status === 400) {
          this.publishMatchRegistryFailure(error.error.message);
        }
      }
    });
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
