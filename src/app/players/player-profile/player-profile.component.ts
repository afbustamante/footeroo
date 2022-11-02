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

  phoneNumberPattern = '^([+]{1}[0-9]{1,3} [0-9\ ]{6,13}|[0-9\-\ \.]{6,16})$';
  passwordPattern = '^[0-9a-zA-Z]{6,24}$';

  currentPlayer: Player;

  profileDetailsForm = this.fb.group({
    firstName: ['', Validators.required],
    surname: ['', Validators.required],
    email: [{value: '', disabled: true}],
    phoneNumber: ['', Validators.pattern(this.phoneNumberPattern)]
  });

  credentialsForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    currentPassword: [null, [Validators.required, Validators.pattern(this.passwordPattern)]],
    newPassword: [null, [Validators.required, Validators.pattern(this.passwordPattern)]],
    passwordConfirmation: [null, [Validators.required, Validators.pattern(this.passwordPattern)]]
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
            phoneNumber: this.currentPlayer.phoneNumber ? this.currentPlayer.phoneNumber : ''
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

    this.playersService.updatePlayerDetails(this.currentPlayer).subscribe({
      next: (response) => {
        if (response.status === 202) {
          this.publishPlayerUpdateSuccess();
          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        if (error.status === 400) {
          this.publishPlayerUpdateFailure(error.error.message);
        }
      }
    });
  }

  onSubmitCredentials() {
    let validCredentials: boolean;
    let errorMessage: string;

    if (this.credentialsForm.value.currentPassword === this.credentialsForm.value.newPassword) {
      errorMessage = 'Your old and new password must be different';
      validCredentials = false;
    } else if (this.credentialsForm.value.passwordConfirmation !== this.credentialsForm.value.newPassword) {
      errorMessage = 'Your new password and your password confirmation must be the same';
      validCredentials = false;
    } else {
      validCredentials = true;
    }

    if (validCredentials) {
      const credentials: Credentials = {
        username: this.currentPlayer.email,
        oldPassword: btoa(this.credentialsForm.value.currentPassword),
        password: btoa(this.credentialsForm.value.newPassword)
      };

      this.authenticationService.updateCredentials(this.currentPlayer, credentials).subscribe({
        next: (response) => {
          if (response.status === 202) {
            this.publishPlayerUpdateSuccess();
            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          if (error.status === 400 || error.status === 500) {
            this.publishPlayerUpdateFailure(error.error.message);
          }
        }
      });
    } else {
      this.publishPlayerUpdateFailure(errorMessage);
      return;
    }
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
