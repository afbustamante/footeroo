import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewMatchComponent } from './new-match/new-match.component';
import { MatchSearchComponent } from './match-search/match-search.component';
import { MatchListComponent } from './match-list/match-list.component';



@NgModule({
  declarations: [NewMatchComponent, MatchSearchComponent, MatchListComponent],
  imports: [
    CommonModule
  ]
})
export class MatchesModule { }
