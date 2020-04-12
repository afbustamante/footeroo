import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './security/sign-in/sign-in.component';
import { MainActionsComponent } from './commons/main-actions/main-actions.component';
import { MatchRegistryComponent } from './matches/match-registry/match-registry.component';
import { MatchSearchComponent } from './matches/match-search/match-search.component';
import { MatchListComponent } from './matches/match-list/match-list.component';
import { PlayerRegistryComponent } from './players/player-registry/player-registry.component';
import { SignInGuard } from './security/sign-in.guard';
import { MatchDetailComponent } from './matches/match-detail/match-detail.component';

const routes: Routes = [
  { path: '', component: MainActionsComponent },
  { path: 'register', component: PlayerRegistryComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'matches/create', component: MatchRegistryComponent, canActivate: [SignInGuard] },
  { path: 'matches/search', component: MatchSearchComponent, canActivate: [SignInGuard] },
  { path: 'matches/list', component: MatchListComponent, canActivate: [SignInGuard] },
  { path: 'match/:code', component: MatchDetailComponent, canActivate: [SignInGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
