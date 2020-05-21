import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './security/sign-in/sign-in.component';
import { HomeComponent } from './commons/home/home.component';
import { MatchRegistryComponent } from './matches/match-registry/match-registry.component';
import { MatchSearchComponent } from './matches/match-search/match-search.component';
import { MatchListComponent } from './matches/match-list/match-list.component';
import { MatchJoinWithCarComponent } from './matches/match-join-with-car/match-join-with-car.component';
import { MatchJoinWithoutCarComponent } from './matches/match-join-without-car/match-join-without-car.component';
import { MatchCarpoolComponent } from './matches/match-carpool/match-carpool.component';
import { PlayerRegistryComponent } from './players/player-registry/player-registry.component';
import { PlayerProfileComponent } from './players/player-profile/player-profile.component';
import { SignInGuard } from './security/sign-in.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: PlayerRegistryComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'profile', component: PlayerProfileComponent, canActivate: [SignInGuard]  },
  { path: 'create', component: MatchRegistryComponent, canActivate: [SignInGuard] },
  { path: 'search', component: MatchSearchComponent, canActivate: [SignInGuard] },
  { path: 'list', component: MatchListComponent, canActivate: [SignInGuard] },
  { path: 'match/:code/join-with-car', component: MatchJoinWithCarComponent, canActivate: [SignInGuard] },
  { path: 'match/:code/join-without-car', component: MatchJoinWithoutCarComponent, canActivate: [SignInGuard] },
  { path: 'match/:code/carpooling', component: MatchCarpoolComponent, canActivate: [SignInGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
