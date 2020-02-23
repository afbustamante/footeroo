import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './security/sign-in/sign-in.component';
import { MainActionsComponent } from './commons/main-actions/main-actions.component';
import { NewMatchComponent } from './matches/new-match/new-match.component';
import { MatchSearchComponent } from './matches/match-search/match-search.component';
import { MatchListComponent } from './matches/match-list/match-list.component';
import { PlayerRegistryComponent } from './players/player-registry/player-registry.component';

const routes: Routes = [
  { path: '', component: MainActionsComponent },
  { path: 'register', component: PlayerRegistryComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'matches/new', component: NewMatchComponent },
  { path: 'matches/search', component: MatchSearchComponent },
  { path: 'matches/list', component: MatchListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
