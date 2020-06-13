import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';
import { Credentials } from '../credentials';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  user: User;
  token: string;

  passwordPattern = '^[0-9a-zA-Z]{6,24}$';

  requestForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]]
  });

  passwordResetForm = this.fb.group({
    newPassword: [null, [Validators.required, Validators.pattern(this.passwordPattern)]],
    passwordConfirmation: [null, [Validators.required, Validators.pattern(this.passwordPattern)]],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private messageSnackBar: MatSnackBar,
    private authenticationService: AuthenticationService
  ) {
    this.token = this.route.snapshot.queryParams.token;
  }

  ngOnInit(): void {
    if (this.token) {
      this.authenticationService.findUserByToken(this.token).subscribe(
        data => {
          this.user = data;

          this.requestForm.setValue({
            email: data.email
          });
          this.requestForm.disable();
        }
      );
    }
  }

  submitRequest() {
    console.log('Token reset request');

    this.authenticationService.sendPasswordResetToken(this.requestForm.value.email).subscribe(
      data => {
        // TODO Translate this message
        this.publishActionSuccess('Your request has been successfully accepted. Please check your inbox and follow the instructions.');
      },
      error => {
        if (error.status === 500) {
          this.publishActionFailure(error.headers.get('ctx-messages'));
        }
      }
    );
  }

  submitUpdate() {
    console.log('Update password');

    if (this.passwordResetForm.value.passwordConfirmation !== this.passwordResetForm.value.newPassword) {
      const message = 'Your new password and your password confirmation must be the same';
      this.publishActionFailure(message);
    } else {
      const credentials: Credentials = {
        username: this.user.email,
        password: btoa(this.passwordResetForm.value.newPassword),
        validationToken: this.token
      };

      this.authenticationService.updateCredentials(this.user, credentials).subscribe(
        data => {
          // TODO Translate this message
          this.publishActionSuccess('Your password has been successfully updated. You can sign-in now.');
        },
        error => {
          if (error.status === 500) {
            this.publishActionFailure(error.headers.get('ctx-messages'));
          }
        }
      );
    }
  }

  private publishActionSuccess(message: string) {
    this.messageSnackBar.open(message, 'OK', {
      duration: 8000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  private publishActionFailure(message: string) {
    this.messageSnackBar.open(message, 'OK', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }
}
