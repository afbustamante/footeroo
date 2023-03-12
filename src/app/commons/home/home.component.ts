import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { Player } from 'src/app/players/player';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentPlayer: Player;
  userData$: Observable<any>;

  constructor(
    private oidcSecurityService: OidcSecurityService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon('appointment-new', sanitizer.bypassSecurityTrustResourceUrl('assets/img/actions/appointment-new.svg'));
    iconRegistry.addSvgIcon('system-search', sanitizer.bypassSecurityTrustResourceUrl('assets/img/actions/system-search.svg'));
    iconRegistry.addSvgIcon('office-calendar', sanitizer.bypassSecurityTrustResourceUrl('assets/img/apps/office-calendar.svg'));
  }

  ngOnInit(): void {
    this.userData$ = this.oidcSecurityService.userData$;

    this.userData$.subscribe(
      data => {
        this.currentPlayer = { firstName: data['given_name'], surname: data['family_name'], email: data['email']};
      }
    );
  }

}
