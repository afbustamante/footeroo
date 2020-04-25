import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SitesService } from 'src/app/sites/sites.service';
import { Site } from 'src/app/sites/site';
import { MatchesService } from 'src/app/matches/matches.service';
import { Match } from '../match';
import { Router } from '@angular/router';
import { SiteRegistryComponent } from 'src/app/sites/site-registry/site-registry.component';

@Component({
  selector: 'app-match-registry',
  templateUrl: './match-registry.component.html',
  styleUrls: ['./match-registry.component.css']
})
export class MatchRegistryComponent implements OnInit {

  @Output()
  lastCreatedCode: string;

  registryForm = this.fb.group({
    date: [null, Validators.required],
    time: [null, Validators.required],
    numPlayersMin: [null],
    numPlayersMax: [null],
    site: [null, Validators.required],
    carpoolingEnabled: [true],
    sharingEnabled: [true]
  });

  minDate = Date.now;
  sites: Site[];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private messageSnackBar: MatSnackBar,
    private sitesService: SitesService,
    private matchesService: MatchesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sitesService.findSites().subscribe(result => {
      this.sites = result;
    });
  }

  onSubmit() {
    const matchForm = this.registryForm.value;

    const match: Match = {
      date: new Date(matchForm.date + 'T' + matchForm.time + ':00'),
      numPlayersMin: matchForm.numPlayersMin,
      numPlayersMax: matchForm.numPlayersMax,
      carpoolingEnabled: matchForm.carpoolingEnabled,
      sharingEnabled: matchForm.sharingEnabled,
      site: matchForm.site
    };

    this.matchesService.createMatch(match).subscribe(
      response => {
        const location = response.headers.get('Location');

        if (location) {
          const locationParts = location.split('/');
          const code = locationParts[locationParts.length - 1];
          this.publishMatchRegistrySuccess(code);
          this.router.navigate(['/matches/list']);
        }
      }
    );
  }

  publishMatchRegistrySuccess(code: string) {
    this.lastCreatedCode = code;

    // TODO Translate this message
    let message = 'Match successfully created with the code ' + code + '. ';
    message += 'Copy and share this the code with your friends for them to join this match. ';

    this.messageSnackBar.open(message, 'OK', {
      duration: 8000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  openSiteRegistryDialog(): void {
    const dialogRef = this.dialog.open(SiteRegistryComponent, {
      width: '400px',
      data: {
        name: '',
        address: '',
        phoneNumber: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.addSite(result);
    });
  }

  addSite(site: Site): void {
    if (site) {
      this.sites.push(site);
    }
  }
}
