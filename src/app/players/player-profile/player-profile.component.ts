import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { PlayersService } from '../players.service';
import { Player } from '../player';

@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.css']
})
export class PlayerProfileComponent implements OnInit {

  phoneNumberPattern = '^([+]{1}[0-9]{1,3} [0-9 ]{6,13}|[0-9- .]{6,16})$';
  passwordPattern = '^[0-9a-zA-Z]{6,24}$';

  currentPlayer: Player;

  profileDetailsForm = this.fb.group({
    firstName: [null, Validators.required],
    surname: [null, Validators.required],
    email: [{value: null, disabled: true}],
    phoneNumber: [null, Validators.pattern(this.phoneNumberPattern)]
  });

  credentialsForm = this.fb.group({
    username: [null, [Validators.required, Validators.email]],
    currentPassword: [null, [Validators.required, Validators.pattern(this.passwordPattern)]],
    newPassword: [null, [Validators.required, Validators.pattern(this.passwordPattern)]],
    passwordConfirmation: [null, [Validators.required, Validators.pattern(this.passwordPattern)]]
  });

  constructor(
    private fb: UntypedFormBuilder,
    private authenticationService: AuthenticationService,
    private playersService: PlayersService,
    private messageSnackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authenticationService.currentUser;

    if (user) {
      this.playersService.loadPlayerByEmail(user.email).subscribe({
        next: (data) => {
          this.currentPlayer = data;

          this.profileDetailsForm.patchValue({
            firstName: this.currentPlayer.first_name,
            surname: this.currentPlayer.surname,
            email: this.currentPlayer.email,
            phoneNumber: this.currentPlayer.phone_number ? this.currentPlayer.phone_number : ''
          });

          this.credentialsForm.patchValue({
            username: this.currentPlayer.email,
            currentPassword: null,
            newPassword: null,
            passwordConfirmation: null
          });
        }
      });
    }
  }

  onSubmitDetails() {
    this.currentPlayer.first_name = this.profileDetailsForm.value.firstName;
    this.currentPlayer.surname = this.profileDetailsForm.value.surname;
    this.currentPlayer.phone_number = this.profileDetailsForm.value.phoneNumber;

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
    this.messageSnackBar.open('This feature is currently unavailable.', 'OK', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
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
