import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SitesService } from 'src/app/sites/sites.service';
import { Site } from 'src/app/sites/site';
import { Observable } from 'rxjs';
import { MatchesService } from 'src/app/matches/matches.service';
import { Match } from '../match';
import { Router } from '@angular/router';

@Component({
  selector: 'app-match-registry',
  templateUrl: './match-registry.component.html',
  styleUrls: ['./match-registry.component.css']
})
export class MatchRegistryComponent implements OnInit {

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
  sites$: Observable<Site[]>;

  constructor(
    private fb: FormBuilder,
    private sitesService: SitesService,
    private matchesService: MatchesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sites$ = this.sitesService.findSites();
  }

  onSubmit() {
    const matchForm = this.registryForm.value;

    const match: Match = {
      date: new Date(matchForm['date'] + 'T' + matchForm['time'] + ':00'),
      numPlayersMin: matchForm['numPlayersMin'],
      numPlayersMax: matchForm['numPlayersMax'],
      carpoolingEnabled: matchForm['carpoolingEnabled'],
      sharingEnabled: matchForm['sharingEnabled'],
      site: matchForm['site']
    }

    this.matchesService.createMatch(match).subscribe(
      response => {
        const location = response.headers.get('Location');
        console.log(location);
        
        if (location) {
          const locationParts = location.split('/');
          const code = locationParts[locationParts.length - 1];
          this.showSuccessMessage(code);
        }
      }
    );
  }

  showSuccessMessage(code: string) {
    console.log("Match successfully created with the code " + code);
    this.router.navigate[`match/${code}`]
  }
}
