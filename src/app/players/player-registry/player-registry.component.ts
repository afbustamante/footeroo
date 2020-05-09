import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlayersService } from '../players.service';
import { Player } from '../player';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-registry',
  templateUrl: './player-registry.component.html',
  styleUrls: ['./player-registry.component.css']
})
export class PlayerRegistryComponent {
  registryForm = this.fb.group({
    firstName: [null, Validators.required],
    surname: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(6)]],
    passwordConfirmation: [null, [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageSnackBar: MatSnackBar,
    private playersService: PlayersService
  ) {}

  onSubmit() {
    const player: Player = {
      firstName: this.registryForm.value.firstName,
      surname: this.registryForm.value.surname,
      email: this.registryForm.value.email,
      password: btoa(this.registryForm.value.password) // Base64 encoded password
    };
    this.playersService.registerPlayer(player)
      .subscribe(
        response => {
          const location = response.headers.get('Location');

          if (location) {
            const locationParts = location.split('/');
            const playerId = locationParts[locationParts.length - 1];
            this.publishPlayerRegistrySuccess(playerId);
            this.router.navigate(['/']);
          }
        }
      );
  }

  private publishPlayerRegistrySuccess(playerId: string) {
    // TODO Translate this message
    this.messageSnackBar.open('Player successfully signed up. You can sign in now.', 'OK', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }
}
