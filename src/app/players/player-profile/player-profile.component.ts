import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { PlayersService } from '../players.service';
import { Player } from '../player';
import { Credentials } from 'src/app/security/credentials';

@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.css']
})
export class PlayerProfileComponent implements OnInit {

  currentPlayer: Player;

  profileDetailsForm = this.fb.group({
    firstName: [null, Validators.required],
    surname: [null, Validators.required],
    email: [{value: null, disabled: true}],
    phoneNumber: [null, Validators.pattern('^([+]{1}[0-9]{1,3} [0-9\ ]{6,13}|[0-9\-\ \.]{6,16})$')]
  });

  credentialsForm = this.fb.group({
    username: [null, [Validators.required, Validators.email]],
    currentPassword: [null, [Validators.required, Validators.minLength(6)]],
    newPassword: [null, [Validators.required, Validators.minLength(6)]],
    passwordConfirmation: [null, [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private playersService: PlayersService,
    private messageSnackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authenticationService.currentUser;

    if (user) {
      this.playersService.loadPlayerByEmail(user.email).subscribe(
        data => {
          this.currentPlayer = data;

          this.profileDetailsForm.setValue({
            firstName: this.currentPlayer.firstName,
            surname: this.currentPlayer.surname,
            email: this.currentPlayer.email,
            phoneNumber: this.currentPlayer.phoneNumber
          });

          this.credentialsForm.setValue({
            username: this.currentPlayer.email,
            currentPassword: null,
            newPassword: null,
            passwordConfirmation: null
          });
        }
      );
    }
  }

  onSubmitDetails() {
    this.currentPlayer.firstName = this.profileDetailsForm.value.firstName;
    this.currentPlayer.surname = this.profileDetailsForm.value.surname;
    this.currentPlayer.phoneNumber = this.profileDetailsForm.value.phoneNumber;

    this.playersService.updatePlayerDetails(this.currentPlayer).subscribe(
      response => {
        if (response.status === 202) {
          this.publishPlayerUpdateSuccess();
          this.router.navigate(['/']);
        }
      },
      error => {
        if (error.status === 400) {
          this.publishPlayerUpdateFailure(error.headers.get('ctx-messages'));
        }
      }
    );
  }

  onSubmitCredentials() {
    const credentials: Credentials = {
      username: this.currentPlayer.email,
      oldPassword: btoa(this.credentialsForm.value.currentPassword),
      password: btoa(this.credentialsForm.value.newPassword)
    };

    this.authenticationService.updateCredentials(this.currentPlayer, credentials).subscribe(
      response => {
        if (response.status === 202) {
          this.publishPlayerUpdateSuccess();
          this.router.navigate(['/']);
        }
      },
      error => {
        if (error.status === 400 || error.status === 500) {
          this.publishPlayerUpdateFailure(error.headers.get('ctx-messages'));
        }
      }
    );
  }

  private publishPlayerUpdateSuccess() {
    // TODO Translate this message
    this.messageSnackBar.open('Player information successfully updated', 'OK', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  private publishPlayerUpdateFailure(message: string) {
    this.messageSnackBar.open(message, 'OK', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }
}
