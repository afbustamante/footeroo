import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-player-registry',
  templateUrl: './player-registry.component.html',
  styleUrls: ['./player-registry.component.css']
})
export class PlayerRegistryComponent {
  registryForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, Validators.required],
    password: [null, Validators.required],
    passwordConfirmation: [null, Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
  }
}
