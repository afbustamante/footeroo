import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Match } from '../match';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { MatchJoinConfirmationComponent } from '../match-join-confirmation/match-join-confirmation.component';

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
  placesAvailable: boolean;

  constructor(
    private dialog: MatDialog,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.playerAlreadyRegistered = false;
    this.pastMatch = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.playerAlreadyRegistered = this.isPlayerAlreadyRegistered();
    this.pastMatch = (this.match) && (new Date(this.match.date) < new Date());
    this.placesAvailable = (this.match) && (
      (this.match.numPlayersMax && this.match.numPlayersMax > this.match.numRegisteredPlayers) || (this.match.numPlayersMax == null)
    );
  }

  isPlayerAlreadyRegistered(): boolean {
    const currentUser = this.authenticationService.currentUser;
    let alreadyRegistered = false;

    if (currentUser && this.match && this.match.registrations) {
      this.match.registrations.forEach(reg => {
        if (reg.player.email === currentUser.email) {
          alreadyRegistered = true;
        }
      });
    }
    return alreadyRegistered;
  }

  openMatchJoinConfirmationDialog(): void {
    const dialogRef = this.dialog.open(MatchJoinConfirmationComponent, {
      width: '400px',
      data: {
        matchCode: this.match.code,
        matchDate: this.match.date,
        carpoolingEnabled: this.match.carpoolingEnabled
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Join mode: ' + result);
      }
    });
  }
}
