import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  @Output() signInUserEvent = new EventEmitter<User>();

  signinForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
  });
  errorCode: number;
  destination: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private messageSnackBar: MatSnackBar,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.destination = this.route.snapshot.queryParams.dest || '/';
  }

  onSubmit() {
    if (this.signinForm.invalid) {
      return;
    }

    this.authenticationService.signIn(this.signinForm.controls.username.value, this.signinForm.controls.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.signInUserEvent.emit(data.body);
          this.router.navigate([this.destination]);
        },
        error => {
          this.errorCode = error.status;
          
          if (this.errorCode === 401) {
            // Invalid credentials
            this.messageSnackBar.open(error.headers.get('ctx-messages'), 'OK', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            })
          } else {
            // A problem occurred with the server
            // TODO Translate this message
            this.messageSnackBar.open('The remote server is unavailable now. Please try again later.', 'OK', {
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            })
          }
        }
      );
  }
}
