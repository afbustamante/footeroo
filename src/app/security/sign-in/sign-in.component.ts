import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../user';

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
  errorMessage: string;
  destination: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
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
          this.signInUserEvent.emit(data);
          this.router.navigate([this.destination]);
        },
        error => {
          this.errorMessage = error;
        }
      );
  }
}
