import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Match } from '../match';
import { AuthenticationService } from 'src/app/security/authentication.service';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css']
})
export class MatchDetailComponent implements OnInit, OnChanges {

  @Input()
  code: string;

  @Input()
  match: Match;

  playerAlreadyRegistered: boolean;
  pastMatch: boolean;

  constructor(
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.playerAlreadyRegistered = false;
    this.pastMatch = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.playerAlreadyRegistered = this.isPlayerAlreadyRegistered();
    this.pastMatch = (this.match && this.match.date.getTime < Date.now);
  }

  isPlayerAlreadyRegistered(): boolean {
    const currentUser = this.authenticationService.currentUser;
    if (currentUser && this.match && this.match.registrations) {
      this.match.registrations.forEach(reg => {
        if (reg.player.email === currentUser.email) {
          console.log('Player already registered');
          return true;
        }
      });
    }
    return false;
  }
}
